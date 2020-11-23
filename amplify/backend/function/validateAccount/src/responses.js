const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Expose-Headers': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*'
};

const redirectResponse = (location, message = 'Redirect') => ({
  statusCode: 302,
  headers: {
      ...headers,
      Location: location
  },
  body: JSON.stringify(message),
});

exports.redirectResponse = redirectResponse;

exports.errorRedirect = (baseUrl, message) => {
  return redirectResponse(baseUrl + '/error/?message='+message, 'Redirect succesfully');
};