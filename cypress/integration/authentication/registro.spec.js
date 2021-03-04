import selectors from "../../common/selectors";
import * as mockResponses from "../../mocks/authentication/registro.mock";

const registrar = (usuario) => {
  cy.visit('/registro');
  if (usuario && usuario.email && usuario.email.length > 0) {
    cy.get('input[name="email"]').type(usuario.email);
  }
  if (usuario && usuario.password && usuario.password.length > 0) {
    cy.get('input[name="password"]').type(usuario.password);
  }
  cy.get('form').submit();
};

let usuarioValido, usuarioInvalido;

describe('Registro', () => {

  before(() => {
    cy.fixture('usuarios').then(({ valido, invalido }) => {
      usuarioValido = valido;
      usuarioInvalido = invalido;
    });
  })

  describe('Registrar una cuenta con datos válidos', () => {
    before(() => {
      mockResponses.registroConExito();
      registrar(usuarioValido);
      cy.wait('@signUp');
    });

    it('redirige a iniciar sesión', () => {
      cy.url().should('contain', 'iniciar-sesion');
    });

    it('muestra un mensaje de éxito', () => {
      cy.contains('Te hemos enviado un enlace de confirmación').should('exist');
    });

    it('permite el reenvío del mensaje de confirmación', () => {
      cy.contains('button', 'Enviar de nuevo').should('exist');
    });
  });

  describe('Intentar registrar una cuenta con datos inválidos', () => {
    const intentarRegistrarInvalido = (usuario, errorEsperado) => {
      registrar(usuario);
      if (errorEsperado) {
        cy.contains(selectors.errorCampoFormulario, errorEsperado).should('exist');
      }
    };

    describe('Campo email en blanco', () => {

      it('muestra un error en el campo del formulario', () => {
        const usuario = { ...usuarioValido, email: '' };
        intentarRegistrarInvalido(usuario, 'Introduce tu email');
      });
    });

    describe('Campo email inválido', () => {

      it('muestra un error en el campo del formulario', () => {
        const usuario = { ...usuarioValido, email: usuarioInvalido.email };
        intentarRegistrarInvalido(usuario, 'No es una dirección de email válida');
      });

      describe('Introducir un email válido', () => {
        
        beforeEach(() => {
          const usuario = { ...usuarioValido, email: usuarioInvalido.email };
          intentarRegistrarInvalido(usuario);
          cy.get('input[name="email"]').click();
          cy.get('input[name="email"]').clear();
          cy.get('input[name="email"]').type(usuarioValido.email);
        });

        it('elimina el error en el campo del formulario', () => {
          cy.get(selectors.errorCampoFormulario).should('not.exist');
        });
      });
    });

    describe('Campo contraseña en blanco', () => {

      it('muestra un error en el campo del formulario', () => {
        const usuario = { ...usuarioValido, password: '' };
        intentarRegistrarInvalido(usuario, 'Introduce tu contraseña');
      });
    });

    describe('Campo contraseña sin minúsculas', () => {

      it('muestra un error en el campo del formulario', () => {
        const usuario = { ...usuarioValido, password: 'AAAAAA1.1.1.' };
        intentarRegistrarInvalido(usuario, 'La contraseña debe tener al menos una letra minúscula');
      });
    });

    describe('Campo contraseña sin mayúsculas', () => {

      it('muestra un error en el campo del formulario', () => {
        const usuario = { ...usuarioValido, password: 'aaaaaa1.1.1.' };
        intentarRegistrarInvalido(usuario, 'La contraseña debe tener al menos una letra mayúscula');
      });
    });

    describe('Campo contraseña sin números', () => {

      it('muestra un error en el campo del formulario', () => {
        const usuario = { ...usuarioValido, password: 'aaaAAA......' };
        intentarRegistrarInvalido(usuario, 'La contraseña debe tener al menos un número');
      });
    });

    describe('Campo contraseña sin símbolos', () => {

      it('muestra un error en el campo del formulario', () => {
        const usuario = { ...usuarioValido, password: 'aaaAAA111111' };
        intentarRegistrarInvalido(usuario, 'La contraseña debe tener al menos un símbolo');
      });
    });

    describe('Campo contraseña demasiado corto', () => {

      it('muestra un error en el campo del formulario', () => {
        const usuario = { ...usuarioValido, password: 'aA1.' };
        intentarRegistrarInvalido(usuario, 'La contraseña debe tener al menos 12 caracteres');
      });

      describe('Introducir una contraseña válida', () => {
        beforeEach(() => {
          const usuario = { ...usuarioValido, password: 'aA1.' };
          intentarRegistrarInvalido(usuario);
          cy.get('input[name="password"]').click();
          cy.get('input[name="password"]').clear();
          cy.get('input[name="password"]').type(usuarioValido.password);
        });

        it('elimina el error en el campo del formulario', () => {
          cy.get(selectors.errorCampoFormulario).should('not.exist');
        });
      });
    });
  });

  // describe('Intentar registrar una cuenta ya registrada', () => {

  //   it('muestra un mensaje de error tras cargar', () => {
  //     cy.fixture('usuarios').then(({ validoRegistrado : usuario }) => {
  //       registrar(usuario);
  //       cy.waitUntil(() => {
  //         return cy
  //           .get(selectors.spinner)
  //           .should('not.exist')
  //           .then(() => {
  //             return cy.contains('La dirección de email ya se encuentra registrada').should('exist');
  //           });
  //       });
  //     });
  //   });
  // });
});