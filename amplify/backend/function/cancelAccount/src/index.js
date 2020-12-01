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

    let response = {
        statusCode: null,
        body: null,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    };

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
        /**
         * Connect with Cognito service
         */
        const cognito = new AWS.CognitoIdentityServiceProvider({
            region: 'us-east-2',
            apiVersion
        });

        await cognito.adminDeleteUser({
            UserPoolId: userPoolId,
            Username: userSub
        }).promise();

        response.statusCode = 200;
    }
    catch (err) {
        console.log(err);
        response.statusCode = 500;
        response.body = JSON.stringify({ message: 'Internal server error', code: 'InternalError' });
    }

    return response;
};
