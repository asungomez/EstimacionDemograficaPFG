/* Amplify Params - DO NOT EDIT
    AUTH_DEMOGRAFIAPFGEE9E612F_USERPOOLID
    ENV
    REGION
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
const apiVersion = '2016-04-18';

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
