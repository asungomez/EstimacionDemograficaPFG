import selectors from "../../common/selectors";

const urlRestaurar = (email, code = '1234') => `/recuperar-contrasena?code=${code}&email=${email}`;

const requestResetPassword = (email) => {
  cy.visit('/recuperar-contrasena');
  cy.get('input[name="email"]').type(email);
  cy.get('form').submit();
};

describe('Restaurar contraseña', () => {

  describe('Solicitar recuperación de contraseña', () => {
  describe('De una cuenta registrada y confirmada', () => {
    it('muestra un mensaje de éxito', () => {
      cy.fixture('usuarios').then(({ validoConfirmado : usuario }) => {
        requestResetPassword(usuario.email);
        cy.waitUntil(() => {
          return cy
            .get(selectors.spinner)
            .should('not.exist')
            .then(() => {
              return cy.contains('Te hemos enviado un enlace para restaurar tu contraseña').should('exist');
            });
        });
      });
    });

    it('muestra la opción de reenviar mensaje', () => {
      cy.fixture('usuarios').then(({ validoConfirmado : usuario }) => {
        requestResetPassword(usuario.email);
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

  describe('De una cuenta no registrada', () => {
    it('muestra un mensaje indicando que el usuario no está registrado', () => {
      cy.fixture('usuarios').then(({ validoNoRegistrado : usuario }) => {
        requestResetPassword('' + Math.random() + usuario.email);
        cy.waitUntil(() => {
          return cy
            .get(selectors.spinner)
            .should('not.exist')
            .then(() => {
              return cy.contains('Usuario no registrado').should('exist');
            });
        });
      });
    });

    it('muestra la opción de crear una nueva cuenta', () => {
      cy.fixture('usuarios').then(({ validoNoRegistrado : usuario }) => {
        requestResetPassword('' + Math.random() + usuario.email);
        cy.waitUntil(() => {
          return cy
            .get(selectors.spinner)
            .should('not.exist')
            .then(() => {
              return cy.contains('Usuario no registrado').should('exist');
            });
        });
      });
    });
  });

  describe('De una cuenta no confirmada', () => {
      it('muestra un mensaje indicando que el usuario no está confirmado', () => {
        cy.fixture('usuarios').then(({ validoNoConfirmado : usuario }) => {
          requestResetPassword(usuario.email);
          cy.waitUntil(() => {
            return cy
              .get(selectors.spinner)
              .should('not.exist')
              .then(() => {
                return cy.contains('Esta cuenta no está confirmada').should('exist');
              });
          });
        });
      });

      it('muestra la opción de crear una nueva cuenta', () => {
        cy.fixture('usuarios').then(({ validoNoConfirmado : usuario }) => {
          requestResetPassword(usuario.email);
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
  });

  describe('Solicitar reenvío de correo de contraseña', () => {
    it('muestra un mensaje de éxito', () => {
      cy.fixture('usuarios').then(({ validoConfirmado: usuario }) => {
        requestResetPassword(usuario.email);
        cy.waitUntil(() => {
          return cy
            .get(selectors.spinner)
            .should('not.exist')
            .then(() => {
              cy.contains('Enviar de nuevo').click();
              return cy.waitUntil(() => {
                return cy
                  .get(selectors.spinner)
                  .should('not.exist')
                  .then(() => {
                    return cy.contains('Mensaje enviado con éxito').should('exist');
                  });
              });
            });
        });
      });
    });
  });

  describe('Hacer click en enlace de contraseña', () => {
    it('abre el formulario de nueva contraseña', () => {
      cy.visit(urlRestaurar('email@valido.com'));
      cy.contains('Introduce tu nueva contraseña').should('exist');
    });
  });

  describe('Enviar nueva contraseña', () => {

    describe('Con código inválido', () => {
      it('muestra un mensaje de error', () => {
        cy.fixture('usuarios').then(({ validoConfirmado: usuario }) => {
          cy.visit(urlRestaurar(usuario.email));
          cy.get('input[name="password"]').type(usuario.password);
          cy.get('form').submit();
          return cy.waitUntil(() => {
            return cy
              .get(selectors.spinner)
              .should('not.exist')
              .then(() => {
                return cy.contains('Enlace inválido').should('exist');
              });
          });
        });
      });

      it('muestra la opción de reenviar correo', () => {
        cy.fixture('usuarios').then(({ validoConfirmado: usuario }) => {
          cy.visit(urlRestaurar(usuario.email));
          cy.get('input[name="password"]').type(usuario.password);
          cy.get('form').submit();
          return cy.waitUntil(() => {
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

    describe('Con usuario no existente', () => {
      it('muestra un mensaje de error', () => {
        cy.fixture('usuarios').then(({ validoNoRegistrado: usuario }) => {
          cy.visit(urlRestaurar('' + Math.random() + usuario.email));
          cy.get('input[name="password"]').type(usuario.password);
          cy.get('form').submit();
          return cy.waitUntil(() => {
            return cy
              .get(selectors.spinner)
              .should('not.exist')
              .then(() => {
                return cy.contains('El usuario especificado no existe').should('exist');
              });
          });
        });
      });
    });
  });
});