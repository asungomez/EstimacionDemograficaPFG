const AWS = require('aws-sdk');
const { redirectResponse, errorRedirect } = require('./responses');

const apiVersion = '2016-04-18';
const appURL = 'https://deployment-dev.d3ts2y5hfz3gmg.amplifyapp.com';
const userPoolId = 'us-east-2_HJiVnrvgt';

exports.handler = async (request) => {
    try {

        const cognito = new AWS.CognitoIdentityServiceProvider({
            region: 'us-east-2',
            apiVersion
        });

        const newEmail = request.queryStringParameters.newEmail;
        const oldEmail = request.queryStringParameters.currentEmail;
        const code = request.queryStringParameters.code;

        /**
         * Use the received email to look for the user ID in the Cognito User Pool
         */
        const searchParams = {
            AttributesToGet: [],
            Filter: `email = "${oldEmail}"`,
            Limit: 1,
            UserPoolId: userPoolId
        };
        const cognitoId = (await cognito.listUsers(searchParams).promise()).Users[0];

        if (cognitoId) {

            /**
             * Having the username, call the User Pool again to retrieve user attributes
             * We're looking for 2 custom attributes: the temporary one-time code (custom:update_code)
             * and its expiration time (custom:update_code_exp)
             */
            const username = cognitoId.Username;
            const user = await cognito.adminGetUser({
                UserPoolId: userPoolId,
                Username: username
            }).promise();
            const currentCode = user.UserAttributes.find(attr => attr.Name === 'custom:update_code').Value;

            if (code === currentCode) {
                const codeExpiration = +user.UserAttributes.find(
                    attr => attr.Name === 'custom:update_code_exp'
                ).Value;
                const currentTime = (new Date()).getTime();

                if (currentTime <= codeExpiration) {
                    /**
                     * If the received code matches the stored one and it's not expired, the user
                     * attributes can be updated.
                     * 
                     * We set the user email to the new value, mark it as verified and set the
                     * update code as expired.
                     */
                    const emailParams = {
                        UserAttributes: [
                            {
                                Name: 'email',
                                Value: newEmail
                            },
                            {
                                Name: 'email_verified',
                                Value: 'true'
                            },
                            {
                                Name: 'custom:update_code_exp',
                                Value: '0'
                            }
                        ],
                        UserPoolId: userPoolId,
                        Username: username
                    };
                    await cognito.adminUpdateUserAttributes(emailParams).promise();

                    /**
                     * This API endpoint only gets called when the user clicks in a link
                     * received via e-mail. This means that all responses have to eventually
                     * redirect  back to the app.
                     */
                    return redirectResponse(appURL + '/panel/cuenta', 'Redirect succesfully');
                }
                else {
                    return errorRedirect('codigo_expirado', callback);
                }
            }
            else {
                return errorRedirect('codigo_invalido', callback);
            }
        }
        else {
            return errorRedirect('usuario_no_existe', callback);
        }
    } catch (err) {
        return errorRedirect('cambio_fallido', callback);
    }
};
