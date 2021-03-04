import * as mockResponses from "../../mocks/authentication/restaurar-contrasena.mock";
import selectors from '../../common/selectors';

const urlRestaurar = (email, code = '1234') => `/recuperar-contrasena?code=${code}&email=${email}`;

const urlTrasSolicitud = (email) => `/iniciar-sesion?message=resetPasswordRequested&email=${email}`;

const requestResetPassword = (email) => {
  cy.visit('/recuperar-contrasena');
  cy.get('input[name="email"]').type(email);
  cy.get('form').submit();
};

let usuarioValido, usuarioInvalido;

describe('Restaurar contraseña', () => {

  before(() => {
    cy.fixture('usuarios').then(({ valido, invalido }) => {
      usuarioValido = valido;
      usuarioInvalido = invalido;
    });
  });

  describe('Solicitar recuperación de contraseña', () => {
    describe('De una cuenta registrada y confirmada', () => {
      before(() => {
        mockResponses.solicitarConExito();
        requestResetPassword(usuarioValido.email);
        cy.wait('@requestResetPassword');
      });

      it('muestra un mensaje de éxito', () => {
        cy.contains('Te hemos enviado un enlace para restaurar tu contraseña').should('exist');
      });

      it('muestra la opción de reenviar mensaje', () => {
        cy.contains('Enviar de nuevo').should('exist');
      });
    });

    describe('De una cuenta no registrada', () => {
      before(() => {
        mockResponses.solicitarUsuarioNoExiste();
        requestResetPassword(usuarioValido.email);
        cy.wait('@requestResetPassword');
      });

      it('muestra un mensaje indicando que el usuario no está registrado', () => {
        cy.contains('Usuario no registrado').should('exist');
      });

      it('muestra la opción de crear una nueva cuenta', () => {
        cy.contains('Usuario no registrado').should('exist');
      });
    });

    describe('De una cuenta no confirmada', () => {
      before(() => {
        mockResponses.solicitarUsuarioNoConfirmado();
        requestResetPassword(usuarioValido.email);
        cy.wait('@requestResetPassword');
      });

      it('muestra un mensaje indicando que el usuario no está confirmado', () => {
        cy.contains('Esta cuenta no está confirmada').should('exist');
      });

      it('muestra la opción de crear una nueva cuenta', () => {
        cy.contains('Enviar de nuevo').should('exist');
      });
    });
  });

  describe('Solicitar reenvío de correo de contraseña', () => {
    before(() => {
      mockResponses.reenviarCorreoConExito();
      cy.visit(urlTrasSolicitud(usuarioValido.email));
      cy.contains('Enviar de nuevo').click();
      cy.wait('@resendPasswordMail');
    });

    it('muestra un mensaje de éxito', () => {
      cy.contains('Mensaje enviado con éxito').should('exist');
    });
  });

  describe('Hacer click en enlace de contraseña', () => {
    before(() => {
      cy.visit(urlRestaurar(usuarioValido.email));
    });

    it('abre el formulario de nueva contraseña', () => {
      cy.contains('Introduce tu nueva contraseña').should('exist');
    });
  });

  describe('Introducir nueva contraseña', () => {

    describe('Contraseña válida', () => {
      before(() => {
        cy.visit(urlRestaurar(usuarioValido.email));
        cy.get('input[name="password"]').type(usuarioValido.password);
      });

      it('marca como cumplidas todas las restricciones de contraseña', () => {
        cy.get(selectors.restriccionContrasenaInvalida).should('not.exist');
      });
    });

    describe('Contraseña inválida', () => {

      before(() => {
        cy.visit(urlRestaurar(usuarioValido.email));
        cy.get('input[name="password"]').type(usuarioInvalido.password);
        cy.get('form').submit();
      });

      it('muestra un mensaje de error', () => {
        cy.get(selectors.errorCampoFormulario).should('exist');
      });
    });
  });

  describe('Enviar nueva contraseña', () => {

    describe('Con código inválido o caducado', () => {
      before(() => {
        mockResponses.restaurarContrasenaCodigoCaducado();
        cy.visit(urlRestaurar(usuarioValido.email));
        cy.get('input[name="password"]').type(usuarioValido.password);
        cy.get('form').submit();
        cy.wait('@resetPassword');
      });

      it('muestra un mensaje de error', () => {
        cy.contains('Enlace inválido').should('exist');
      });

      it('muestra la opción de reenviar correo', () => {
        cy.contains('Enviar de nuevo').should('exist');
      });
    });

    describe('Con usuario no existente', () => {
      before(() => {
        mockResponses.restaurarContrasenaUsuarioNoExiste();
        cy.visit(urlRestaurar(usuarioValido.email));
        cy.get('input[name="password"]').type(usuarioValido.password);
        cy.get('form').submit();
        cy.wait('@resetPassword');
      });

      it('muestra un mensaje de error', () => {
        cy.contains('El usuario especificado no existe').should('exist');
      });
    });

    describe('Cuando todos los datos son correctos', () => {
      before(() => {
        mockResponses.restaurarContrasenaConExito();
        cy.visit(urlRestaurar(usuarioValido.email));
        cy.get('input[name="password"]').type(usuarioValido.password);
        cy.get('form').submit();
        cy.wait('@resetPassword');
      });

      it('redirige a login', () => {
        cy.url().should('include', 'iniciar-sesion');
      });

      it('muestra un mensaje de éxito', () => {
        cy.contains('Tu contraseña se ha actualizado').should('exist');
      });
    });
  });
});