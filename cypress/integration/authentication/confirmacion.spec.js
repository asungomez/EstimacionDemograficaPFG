import { login } from "../../common/actions";
import selectors from "../../common/selectors";
import config from "../../utils/config";
import * as mockResponses from "../../mocks/authentication/confirmacion.mock";
import * as mockLoginResponses from "../../mocks/authentication/iniciar-sesion.mock";
import { wait } from "@testing-library/react";

const urlConfirmacion = (email, code = '1234', id = 'abcd') => `${config.apiBaseUrl}/accounts/validate?code=${code}&email=${email}&id=${id}`;

const loginNoConfirmado = () => {
  mockLoginResponses.iniciarSesionUsuarioNoConfirmado();
  login({email: 'some@email.com', password: 'aaaAAA1.1.1.'});
  cy.wait('@login');
}

const solicitarReenvioTrasRegistro = (email) => {
  cy.visit(`/iniciar-sesion?message=registered&email=${email}`);
  cy.contains('Enviar de nuevo').click();
};

describe('Confirmacion', () => {

  describe('Visitar URL de confirmación', () => {

    describe('Con datos correctos', () => {
      before(() => {
        mockResponses.confirmacionConExito();
        cy.visit(urlConfirmacion('some@email.com'));
        cy.wait('@confirmation');
      });
  
      it('redirige a login', () => {
        cy.url().should('contain', 'iniciar-sesion');
      });
  
      it('muestra un mensaje de éxito', () => {
        cy.contains('Tu cuenta ha sido confirmada').should('exist');
      });
    });

    describe('Con datos erróneos', () => {
      describe('Con enlace caducado', () => {
        // TODO Probar https://yp989cvkn3.execute-api.us-east-2.amazonaws.com/dev/accounts/validate?code=925843&email=poyiv26807@pxjtw.com&id=72r4557bv9c35c37gp9pjgqmdj
      });

      describe('Cuando el email no existe', () => {
        before(() => {
          mockResponses.confirmacionConUsuarioInvalido();
          cy.visit(urlConfirmacion('some@email.com'));
          cy.wait('@confirmation');
        });

        it('redirige a error', () => {
          cy.url().should('contain', 'error');
        });
    
        it('muestra un mensaje de error', () => {
          cy.contains('Usuario no encontrado').should('exist');
        });
      });

      describe('Cuando el usuario ya está confirmado', () => {
        before(() => {
          mockResponses.confirmacionConUsuarioConfirmado();
          cy.visit(urlConfirmacion('some@email.com'));
          cy.wait('@confirmation');
        });
    
        it('redirige a login', () => {
          cy.url().should('contain', 'iniciar-sesion');
        });
    
        it('muestra un mensaje de éxito', () => {
          cy.contains('Tu cuenta ha sido confirmada').should('exist');
        });
      });
    });
  });


  describe('Solicitar reenvío de correo de confirmación', () => {
    describe('Cuando aún no está confirmado', () => {
      describe('Tras el registro', () => {
        before(() => {
          mockResponses.reenvioConfirmacionConExito();
          solicitarReenvioTrasRegistro('some@email.com');
          cy.wait('@resendConfirmation');
        });

        it('muestra un mensaje de éxito', () => {
          cy.contains('Mensaje enviado con éxito').should('exist');
        });
      });
      
      // TODO https://github.com/cypress-io/cypress/issues/9302
      // describe('Tras el login', () => {
      //   before(() => {
      //     loginNoConfirmado();
      //     mockResponses.reenvioConfirmacionConExito();
      //     cy.contains('Enviar de nuevo').click();
      //     cy.wait('@login');
      //   });

      //   it('muestra un mensaje de éxito', () => {
      //     cy.contains('Mensaje enviado con éxito').should('exist');
      //   });
      // });
    });

    describe('Cuando el correo ya está confirmado', () => {
      describe('Tras el registro', () => {
        before(() => {
          mockResponses.reenvioConfirmacionYaConfirmado();
          solicitarReenvioTrasRegistro('some@email.com');
          cy.wait('@resendConfirmation');
        });

        it('muestra un mensaje informativo', () => {
          cy.contains('Tu cuenta de usuario ya se encuentra confirmada').should('exist');
        });
      });

      // TODO https://github.com/cypress-io/cypress/issues/9302
      // describe('Tras el login', () => {

      // });

      describe('Desde la vista de error', () => {
        before(() => {
          mockResponses.reenvioConfirmacionYaConfirmado();
          cy.visit('/error/?message=confirmacion_fallida&email=some@email.com');
          cy.contains('Reenviar mensaje').click();
          cy.wait('@resendConfirmation');
        });

        it('redirige a iniciar sesión', () => {
          cy.url().should('contain', 'iniciar-sesion');
        });
        
        it('muestra un mensaje de éxito', () => {
          cy.contains('Tu cuenta ha sido confirmada').should('exist');
        });
      });
    });

    describe('Cuando el límite de intentos se ha superado', () => {
      describe('Tras el registro', () => {
        before(() => {
          mockResponses.reenvioConfirmacionLimiteSuperado();
          solicitarReenvioTrasRegistro('some@email.com');
          cy.wait('@resendConfirmation');
        });

        it('muestra un mensaje informativo', () => {
          cy.contains('Límite de intentos superado').should('exist');
        });
      });

      // TODO https://github.com/cypress-io/cypress/issues/9302
      // describe('Tras el login', () => {

      // });

      describe('Desde la vista de error', () => {
        before(() => {
          mockResponses.reenvioConfirmacionLimiteSuperado();
          cy.visit('/error/?message=confirmacion_fallida&email=some@email.com');
          cy.contains('Reenviar mensaje').click();
          cy.wait('@resendConfirmation');
        });

        it('muestra un mensaje de error', () => {
          cy.contains('Límite de intentos superado').should('exist');
        });
      });
    });
  });

  // describe('Solicitar reenvío de correo de confirmación', () => {



      // describe('Tras superar el límite de reintentos', () => {
      //   it('Muestra un mensaje de error', () => {
      //     cy.fixture('usuarios').then(({ validoNoConfirmado: usuario }) => {
      //       for (let i = 0; i < 10; i++) {
      //         solicitarReenvio(usuario);
      //         cy.waitUntil(() => {
      //           return cy
      //             .get(selectors.spinner)
      //             .should('not.exist')
      //             .then(() => {
      //               return cy.contains('Límite de intentos superado,').should('exist');
      //             });
      //         });
      //       }
      //     })
      //   });
      // });
  //   });
  // });

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