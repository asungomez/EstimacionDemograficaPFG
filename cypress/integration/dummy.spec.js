describe('Dummy test', () => {

  it('Opens welcome page', () => {
    cy.visit('/');
    cy.contains('Welcome').should('exist');
  });
});