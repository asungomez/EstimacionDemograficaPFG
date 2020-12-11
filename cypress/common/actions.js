export default {
  login: (usuario) => {
    cy.visit('/iniciar-sesion');
    if(usuario && usuario.email && usuario.email.length > 0) {
      cy.get('input[name="email"]').type(usuario.email);
    }
    if(usuario && usuario.password && usuario.password.length > 0) {
      cy.get('input[name="password"]').type(usuario.password);
    }
    cy.get('form').submit();
  }
}