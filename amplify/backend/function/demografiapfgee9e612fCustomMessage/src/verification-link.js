const { accountConfirmation, forgotMyPassword } = require("emails");

exports.handler = (event, context, callback) => {
  if (
    event.triggerSource === 'CustomMessage_SignUp' 
    || event.triggerSource === 'CustomMessage_ResendCode') {
    const { codeParameter } = event.request;
    const email = event.request.userAttributes.email;
    const { clientId } = event.callerContext;
    const link = `https://yp989cvkn3.execute-api.us-east-2.amazonaws.com/dev/accounts/validate?code=${codeParameter}&email=${email}&id=${clientId}`;
    event.response.emailSubject = 'Confirma tu cuenta';
    event.response.emailMessage = accountConfirmation(link);
  } else if (event.triggerSource === "CustomMessage_ForgotPassword") {
    const { email } = event.request.userAttributes;
    const { codeParameter } = event.request;
    const link = `https://deployment-dev.d3ts2y5hfz3gmg.amplifyapp.com/recuperar-contrasena?code=${codeParameter}&email=${email}`;
    event.response.emailSubject = 'Restaurar contraseña';
    event.response.emailMessage = forgotMyPassword(link);
  }
  callback(null, event);
};
