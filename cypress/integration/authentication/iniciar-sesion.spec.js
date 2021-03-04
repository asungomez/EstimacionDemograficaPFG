import { login } from "../../common/actions";
import * as mockResponses from "../../mocks/authentication/iniciar-sesion.mock";

let usuarioConfirmado, usuarioValido;

describe('Iniciar sesion', () => {

  before(() => {
    cy.fixture('usuarios').then(({ validoConfirmado, valido }) => {
      usuarioConfirmado = validoConfirmado;
      usuarioValido = valido;
    });
  });

  describe('Con un usuario registrado y confirmado', () => {

    describe('Usando la contraseña correcta', () => {
      before(() => {
        mockResponses.iniciarSesionEstablecerAlias();
        login(usuarioConfirmado);
        cy.wait('@login');
      });
  
      it('redirige al panel', () => {
        cy.url().should('contain', 'panel');
      });
    });

    describe('Usando una contraseña incorrecta', () => {
      before(() => {
        mockResponses.iniciarSesionContrasenaIncorrecta();
        login(usuarioValido);
        cy.wait('@login');
      });

      it('se mantiene en la página de inicio de sesión', () => {
        cy.url().should('contain', 'iniciar-sesion');
      });
  
      it('muestra un mensaje de error', () => {
        cy.contains('El nombre de usuario no existe o la contraseña no es correcta').should('exist');
      });
    });
  });

  describe('Con un usuario registrado y no confirmado', () => {
    before(() => {
      mockResponses.iniciarSesionUsuarioNoConfirmado();
      login(usuarioValido);
      cy.wait('@login');
    });

    it('se mantiene en la página de inicio de sesión', () => {
      cy.url().should('contain', 'iniciar-sesion');
    });

    it('muestra un mensaje de error', () => {
      cy.contains('Tu dirección de email no está confirmada').should('exist');
    });

    it('permite el reenvío del mensaje de confirmación', () => {
      cy.contains('Enviar de nuevo').should('exist');
    });
  });

  describe('Con un usuario que no existe', () => {
    before(() => {
      mockResponses.iniciarSesionUsuarioNoExiste();
      login(usuarioValido);
      cy.wait('@login');
    });

    it('se mantiene en la página de inicio de sesión', () => {
      cy.url().should('contain', 'iniciar-sesion');
    });

    it('muestra un mensaje de error', () => {
      cy.contains('No existe la cuenta').should('exist');
    });

    it('muestra la opción de registrar una nueva cuenta', () => {
      cy.contains('Crear nueva cuenta').should('exist');
    });
  });

  describe('Cerrar sesión', () => {
    before(() => {
      login(usuarioConfirmado);
      cy.get("[aria-label='Opciones']").click();
      cy.contains('Cerrar sesión').click();
    });

    it('redirige a iniciar sesión', () => {
      cy.url().should('contain', 'iniciar-sesion');
    });
  });
});