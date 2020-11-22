import selectors from "../../common/selectors";

describe('Registro', () => {

  describe('Registrar una cuenta con datos válidos', () => {

    let usuario = {
      email: '',
      password: ''
    };

    beforeEach(() => {
      cy.fixture('usuarios').then(({ validoNoRegistrado }) => {
        usuario.email = '' + Math.random() + validoNoRegistrado.email;
        usuario.password = validoNoRegistrado.password;
        cy.visit('/registro');
        cy.get('input[name="email"]').type(usuario.email);
        cy.get('input[name="password"]').type(usuario.password);
        cy.get('form').submit();
      });
    });

    it('redirige a iniciar sesión', () => {
      cy.waitUntil(() => {
        return cy
          .get(selectors.spinner)
          .should('not.exist')
          .then(() => {
            return cy.url().should('contain', 'iniciar-sesion');
          });
      });
    });

    it('muestra un mensaje de éxito', () => {
      cy.waitUntil(() => {
        return cy
          .get(selectors.spinner)
          .should('not.exist')
          .then(() => {
            return cy.contains('Te hemos enviado un enlace de confirmación').should('exist');
          });
      });
    });

    it('permite el reenvío del mensaje de confirmación', () => {
      cy.waitUntil(() => {
        return cy
          .get(selectors.spinner)
          .should('not.exist')
          .then(() => {
            return cy.contains('button', 'Enviar de nuevo').should('exist');
          });
      });
    });
  });
});