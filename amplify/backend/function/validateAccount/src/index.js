/* Amplify Params - DO NOT EDIT
    AUTH_DEMOGRAFIAPFGEE9E612F_USERPOOLID
    ENV
    REGION
Amplify Params - DO NOT EDIT */

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

        const {code: confirmationCode, email, id: clientId} = request.queryStringParameters;

        /**
         * Use the received email to look for the user ID in the Cognito User Pool
         */
        const searchParams = {
            AttributesToGet: [],
            Filter: `email = "${email}"`,
            Limit: 1,
            UserPoolId: userPoolId
        };

        const cognitoId = (await cognito.listUsers(searchParams).promise()).Users[0];

        if (cognitoId) {

            /**
             * Having the username, call the User Pool again to confirm the user account
             */
            const username = cognitoId.Username;
            const params = {
                ClientId: clientId,
                ConfirmationCode: confirmationCode,
                Username: username
            };

            await cognito.confirmSignUp(params).promise();

            /**
             * This API endpoint only gets called when the user clicks in a link
             * received via e-mail. This means that all responses have to eventually
             * redirect  back to the app.
             */
            return redirectResponse(appURL + '/iniciar-sesion/?message=confirmed');
        }
        else {
            return errorRedirect(appURL, 'usuario_no_existe');
        }

    } catch (error) {
        console.log(error);
        if(error.message.includes('Current status is CONFIRMED')) {
            return redirectResponse(appURL + '/iniciar-sesion/?message=confirmed');
        }
        return errorRedirect(appURL, 'confirmacion_fallida');
    }
};
