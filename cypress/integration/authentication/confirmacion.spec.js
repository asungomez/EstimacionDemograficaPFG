import { login } from "../../common/actions";
import selectors from "../../common/selectors";

const urlConfirmacion = (email, code = '1234', id = 'abcd') => `https://yp989cvkn3.execute-api.us-east-2.amazonaws.com/dev/accounts/validate?code=${code}&email=${email}&id=${id}`;

const solicitarReenvio = (usuario) => {
  login(usuario);
  cy.waitUntil(() => {
    return cy
      .get(selectors.spinner)
      .should('not.exist')
      .then(() => {
        cy.contains('Enviar de nuevo').click();
      });
  });
}

describe('Confirmacion', () => {
  describe('Visitar URL de confirmación con datos erróneos', () => {
    it('muestra un mensaje de error cuando el email no existe', () => {
      cy.fixture('usuarios').then(({ validoNoRegistrado: usuario }) => {
        cy.visit(urlConfirmacion(usuario.email));
        cy.contains('El usuario especificado no existe').should('exist');
      });
    });

    it('redirige a login con un mensaje de éxito si el usuario ya estaba previamente confirmado', () => {
      cy.fixture('enlacesConfirmacion').then(({ yaUsado: enlace }) => {
        cy.visit(urlConfirmacion(enlace.email, enlace.code, enlace.id));
        cy.contains('Tu cuenta ha sido confirmada').should('exist');
      });
    });
  });

  describe('Solicitar reenvío de correo de confirmación', () => {
    describe('Cuando el usuario ya está confirmado', () => {
      describe('Desde la vista de error', () => {
        it('redirige a login con un mensaje de éxito', () => {
          cy.fixture('enlacesConfirmacion').then(({ yaUsado: enlace }) => {
            cy.visit('/error/?message=confirmacion_fallida&email=' + enlace.email);
            cy.contains('Reenviar mensaje').click();
            cy.contains('Tu cuenta ha sido confirmada').should('exist');
          });
        })
      });

      describe('Desde la vista de login', () => {
        it('muestra un mensaje de éxito', () => {
          cy.fixture('enlacesConfirmacion').then(({ yaUsado: enlace }) => {
            cy.visit('/iniciar-sesion?message=registered&email=' + enlace.email);
            cy.contains('Enviar de nuevo').click();
            cy.contains('Tu cuenta de usuario ya se encuentra confirmada').should('exist');
          });
        });
      });
    });
    describe('Cuando el usuario no está confirmado', () => {
      describe('Desde la vista de login', () => {

        it('muestra un mensaje de éxito', () => {
          cy.fixture('usuarios').then(({ validoNoConfirmado: usuario }) => {
            login(usuario);
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

      describe('Desde la vista de error', () => {
        it('muestra un mensaje de éxito', () => {
          cy.fixture('usuarios').then(({ validoNoConfirmado: usuario }) => {
            cy.visit('/error/?message=confirmacion_fallida&email=' + usuario.email);
            cy.contains('Reenviar mensaje').click();
            return cy.waitUntil(() => {
              return cy
                .get(selectors.spinner)
                .should('not.exist')
                .then(() => {
                  return cy.contains('Te hemos enviado un enlace de confirmación').should('exist');
                });
            });
          });
        });
      });

      describe('Tras superar el límite de reintentos', () => {
        it('Muestra un mensaje de error', () => {
          cy.fixture('usuarios').then(({ validoNoConfirmado: usuario }) => {
            for (let i = 0; i < 10; i++) {
              solicitarReenvio(usuario);
              cy.waitUntil(() => {
                return cy
                  .get(selectors.spinner)
                  .should('not.exist')
                  .then(() => {
                    return cy.contains('Límite de intentos superado,').should('exist');
                  });
              });
            }
          })
        });
      });
    });
  });

  // Probar 30-nov 12:30
  // describe('Visitar URL de confirmación con enlace caducado', () => {
  //   it('muestra un mensaje de error', () => {
  //     cy.fixture('enlacesConfirmacion').then(({caducado: enlace}) => {
  //       cy.visit(urlConfirmacion(enlace.email, enlace.code, enlace.id));
  //       cy.contains('Enlace de confirmación caducado').should('exist');
  //     });
  //   })
  // });
});