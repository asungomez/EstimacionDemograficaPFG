import config from '../utils/config';

export const mockResponse = (method, url, fixtureFile, responseType, statusCode, alias) => {
  cy.fixture(fixtureFile).then(fixture => {
    const response = fixture[responseType];
    cy.intercept(method, url, {
      statusCode: statusCode,
      body: response,
      delayMs: config.stubbedResponseDelay,
    }).as(alias);
  });
};

export const mockRedirect = (method, url, redirectionCode, destination, alias) => {
  cy.intercept(method, url, {
    statusCode: redirectionCode,
    headers: {
      location: destination
    }
  }).as(alias);
}

export const setRequestAlias = (method, url, alias) => {
  cy.intercept(method, url).as(alias);
};