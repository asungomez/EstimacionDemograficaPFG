/* Amplify Params - DO NOT EDIT
    AUTH_DEMOGRAFIAPFGEE9E612F_USERPOOLID
    ENV
    REGION
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
const apiVersion = '2016-04-18';
const { newEmailMessage } = require("emails");

const  generateCode = (length = 10) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.handler = async (request) => {

    /**
     * Cognito User Pool and Cognito user ARNs are populated by API Gateway into
     * the requestContext.identity.cognitoAuthenticationProvider field of the response,
     * when the authorizer is set to AWS_IAM and the token was decrypted correctly.
     * These 2 values come in the same string, separated by a comma.
     */
    const [userPoolARN, cognitoUserARN] =
        request.requestContext.identity.cognitoAuthenticationProvider.split(',');

    const { attributes } = JSON.parse(request.body);

    let response = {
        statusCode: null,
        body: null,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    };

    if (attributes.hasOwnProperty('first_name') || attributes.hasOwnProperty('last_name') || attributes.hasOwnProperty('email')) {
        try {
            /**
             * Extract the user pool ID from the user pool ARN
             */
            const userPoolId = userPoolARN.split('/')[1];
            /**
             * Extract the user ID (its sub attribute) from the Cognito user ARN
             */
            const cognitoUserARNParts = cognitoUserARN.split(':');
            const userSub = cognitoUserARNParts[cognitoUserARNParts.length - 1];
            const cognito = new AWS.CognitoIdentityServiceProvider({
                region: 'us-east-2',
                apiVersion
            });

            /**
             * Having the sub, call the User Pool again to find the user name
             */
            const searchParams = {
                AttributesToGet: [],
                Filter: `sub = "${userSub}"`,
                Limit: 1,
                UserPoolId: userPoolId
            };
            const cognitoId = (await cognito.listUsers(searchParams).promise()).Users[0];

            if (cognitoId) {
                const userName = cognitoId.Username;
                /**
                 * Finally, update all user attributes except the e-mail
                 */
                const cognitoAttributes = [];
                if (attributes.hasOwnProperty('first_name')) {
                    cognitoAttributes.push({
                        Name: 'name',
                        Value: attributes.first_name
                    });
                }
                if (attributes.hasOwnProperty('last_name')) {
                    cognitoAttributes.push({
                        Name: 'family_name',
                        Value: attributes.last_name
                    });
                }
                const params = {
                    UserAttributes: cognitoAttributes,
                    UserPoolId: userPoolId,
                    Username: userName
                };
                await cognito.adminUpdateUserAttributes(params).promise();

                if (attributes.hasOwnProperty('email') && attributes.email.length > 0) {

                    /**
                     * First of all, we get the old email, since it will be necessary to identify
                     * the user in the /change-email link
                     */
                    const user = await cognito.adminGetUser({
                        UserPoolId: userPoolId,
                        Username: userName
                    }).promise();
                    const oldEmail = user.UserAttributes.find(attr => attr.Name === 'email').Value;
    
                    /**
                     * Generate a random code and set the expiration time in 2 hours
                     */
                    const updateCode = generateCode();
                    const updateCodeExpiration = (new Date()).getTime() + (2 * 60 * 60 * 1000);
    
                    /**
                     * Update the custom attributes custom:update_code and custom:update_code_exp
                     */
                    const codeParams = {
                        UserAttributes: [
                            {
                                Name: 'custom:update_code',
                                Value: updateCode
                            },
                            {
                                Name: 'custom:update_code_exp',
                                Value: '' + updateCodeExpiration
                            }
                        ],
                        UserPoolId: userPoolId,
                        Username: userName
                    };
    
                    await cognito.adminUpdateUserAttributes(codeParams).promise();
    
                    /**
                     * Send a confirmation e-mail to the new address before making any changes.
                     * If a user tries to change its e-mail address and sends a wrong one (because
                     * of a typo or something like that), we need to make sure it has access to the new
                     * email before actually changing it.
                     * 
                     * The confirmation email provides a confirmation link to /change-email with 3
                     * query params:
                     * 
                     * - oldEmail: To be able to identify the user
                     * - email: The new email address
                     * - code: The one-time temporary code we just created
                     */
    
                    const link = `https://yp989cvkn3.execute-api.us-east-2.amazonaws.com/dev/accounts/validate-new-email?currentEmail=${oldEmail}&newEmail=${attributes.email}&code=${updateCode}`;
                    const ses = new AWS.SES({ region: 'us-east-2' });
                    const email = {
                        Destination: {
                            ToAddresses: [attributes.email]
                        },
                        Message: {
                            Body: {
                                Html: {
                                    Charset: "utf-8",
                                    Data: newEmailMessage(attributes.email, link)
                                }
                            },
                            Subject: {
                                Data: "Confirm tu nueva dirección de correo electrónico"
                            }
                        },
                        Source: "blablabla"
                    };
    
                    await ses.sendEmail(email).promise();
                }
                response.statusCode = 200;
            }
            else {
                response.statusCode = 404;
                response.body = JSON.stringify({ message: 'User not found', code: 'UserNotFoundException' });
            }
        }
        catch (err) {
            console.log(err);
            response.statusCode = 500;
            response.body = JSON.stringify({ message: 'Internal server error', code: 'InternalError' });
        }
    }
    else {
        response.statusCode = 400;
        response.body = JSON.stringify({ message: 'You need to send some user attributes to update', code: 'EmptyRequest' });
    }
    return response;
};
