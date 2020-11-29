import selectors from "../../common/selectors";

const login = (usuario) => {
  cy.visit('/iniciar-sesion');
  if(usuario && usuario.email && usuario.email.length > 0) {
    cy.get('input[name="email"]').type(usuario.email);
  }
  if(usuario && usuario.password && usuario.password.length > 0) {
    cy.get('input[name="password"]').type(usuario.password);
  }
  cy.get('form').submit();
  cy.wait(3000);
};

describe('Iniciar sesion', () => {
  describe('Con un usuario registrado y confirmado', () => {
    it('redirige al panel', () => {
      cy.fixture('usuarios').then(({validoConfirmado: usuario}) => {
        login(usuario);
        cy.waitUntil(() => {
          return cy
            .get(selectors.spinner)
            .should('not.exist')
            .then(() => {
              return cy.url().should('contain', 'panel');
            });
        });
      });
    });
  });

  describe('Con un usuario registrado pero no confirmado', () => {
    it('muestra un mensaje de error', () => {
      cy.fixture('usuarios').then(({validoNoConfirmado: usuario}) => {
        login(usuario);
        cy.waitUntil(() => {
          return cy
            .get(selectors.spinner)
            .should('not.exist')
            .then(() => {
              return cy.contains('Tu dirección de email no está confirmada').should('exist');
            });
        });
      });
    });

    it('muestra la opción de reenviar el mensaje', () => {
      cy.fixture('usuarios').then(({validoNoConfirmado: usuario}) => {
        login(usuario);
        cy.waitUntil(() => {
          return cy
            .get(selectors.spinner)
            .should('not.exist')
            .then(() => {
              return cy.contains('Enviar de nuevo').should('exist');
            });
        });
      });
    });
  });

  describe('Con un usuario que no existe', () => {
    it('muestra un mensaje de error', () => {
      cy.fixture('usuarios').then(({validoNoRegistrado: usuario}) => {
        usuario.email = '' + Math.random() + usuario.email;
        login(usuario);
        cy.waitUntil(() => {
          return cy
            .get(selectors.spinner)
            .should('not.exist')
            .then(() => {
              return cy.contains('No existe la cuenta').should('exist');
            });
        });
      });
    });

    it('muestra la opción de registro', () => {
      cy.fixture('usuarios').then(({validoNoRegistrado: usuario}) => {
        usuario.email = '' + Math.random() + usuario.email;
        login(usuario);
        cy.waitUntil(() => {
          return cy
            .get(selectors.spinner)
            .should('not.exist')
            .then(() => {
              return cy.contains('Crear nueva cuenta').should('exist');
            });
        });
      });
    });
  });

  describe('Cerrar sesión', () => {
    beforeEach(() => {
      cy.fixture('usuarios').then(({validoConfirmado: usuario}) => {
        login(usuario);
      });
    });

    it('redirige a login', () => {
      cy.get("[aria-label='Opciones']").click();
      cy.contains('Cerrar sesión').click();
      cy.url().should('contain', 'iniciar-sesion');
    });
  });
});