import selectors from "../../common/selectors";

const requestResetPassword = (email) => {
  cy.visit('/recuperar-contrasena');
  cy.get('input[name="email"]').type(email);
  cy.get('form').submit();
};

describe('Restaurar contraseña', () => {

  describe('Solicitar recuperación de contraseña', () => {
    // describe('De una cuenta registrada y confirmada', () => {
    //   it('muestra un mensaje de éxito', () => {
    //     cy.fixture('usuarios').then(({ validoConfirmado : usuario }) => {
    //       requestResetPassword(usuario.email);
    //       cy.waitUntil(() => {
    //         return cy
    //           .get(selectors.spinner)
    //           .should('not.exist')
    //           .then(() => {
    //             return cy.contains('Te hemos enviado un enlace para restaurar tu contraseña').should('exist');
    //           });
    //       });
    //     });
    //   });

    //   it('muestra la opción de reenviar mensaje', () => {
    //     cy.fixture('usuarios').then(({ validoConfirmado : usuario }) => {
    //       requestResetPassword(usuario.email);
    //       cy.waitUntil(() => {
    //         return cy
    //           .get(selectors.spinner)
    //           .should('not.exist')
    //           .then(() => {
    //             return cy.contains('Enviar de nuevo').should('exist');
    //           });
    //       });
    //     });
    //   });
    // });

    // describe('De una cuenta no registrada', () => {
    //   it('muestra un mensaje indicando que el usuario no está registrado', () => {
    //     cy.fixture('usuarios').then(({ validoNoRegistrado : usuario }) => {
    //       requestResetPassword('' + Math.random() + usuario.email);
    //       cy.waitUntil(() => {
    //         return cy
    //           .get(selectors.spinner)
    //           .should('not.exist')
    //           .then(() => {
    //             return cy.contains('Usuario no registrado').should('exist');
    //           });
    //       });
    //     });
    //   });

    //   it('muestra la opción de crear una nueva cuenta', () => {
    //     cy.fixture('usuarios').then(({ validoNoRegistrado : usuario }) => {
    //       requestResetPassword('' + Math.random() + usuario.email);
    //       cy.waitUntil(() => {
    //         return cy
    //           .get(selectors.spinner)
    //           .should('not.exist')
    //           .then(() => {
    //             return cy.contains('Usuario no registrado').should('exist');
    //           });
    //       });
    //     });
    //   });
    // });

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
});