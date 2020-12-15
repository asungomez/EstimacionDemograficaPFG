// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-wait-until';

import Amplify, { Auth } from 'aws-amplify';
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: "us-east-1",
    userPoolId: "us-east-2_HJiVnrvgt",
    identityPoolId: "us-east-2:21d803db-d8c2-437d-937a-98c37fee082e",
    userPoolWebClientId: "72r4557bv9c35c37gp9pjgqmdj",
  }
});

Cypress.Commands.add("login", async (email, password) => {
  try {
    await Auth.signIn(email, password)
  }
  catch (e) {
    console.log(e);
  }
})
