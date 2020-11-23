const { accountConfirmation } = require("emails");

exports.handler = (event, context, callback) => {
  if (event.triggerSource === 'CustomMessage_SignUp') {
    const { codeParameter } = event.request;
    const email = event.request.userAttributes.email;
    const { clientId } = event.callerContext;
    const link = `https://yp989cvkn3.execute-api.us-east-2.amazonaws.com/dev/accounts/validate?code=${codeParameter}&email=${email}&id=${clientId}`;
    event.response.emailSubject = 'Confirma tu cuenta';
    event.response.emailMessage = accountConfirmation(link);
  }
  callback(null, event);
};
