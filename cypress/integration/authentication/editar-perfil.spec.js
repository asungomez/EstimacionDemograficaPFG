import * as mockResponses from "../../mocks/authentication/editar-perfil.mock";
import selectors from '../../common/selectors';

const actualizarPerfil = (perfil) => {
  for (const campo in perfil) {
    cy.get(`input[name="${campo}"]`).clear();
    cy.get(`input[name="${campo}"]`).type(perfil[campo]);
  }
  cy.contains('Guardar').click();
};

const actualizarContrasena = (antigua, nueva) => {
  cy.contains('Modificar contraseña').click();
  cy.get('input[name="currentPassword"]').type(antigua);
  cy.get('input[name="newPassword"]').type(nueva);
  cy.contains('Guardar').click();
};

let perfilValido;

describe('Editar perfil', () => {
  beforeEach(() => {
    cy.fixture('perfiles').then(({ valido }) => {
      perfilValido = valido;
    });
    cy.fixture('usuarios').then(async ({ validoConfirmado }) => {
      await cy.login(validoConfirmado.email, validoConfirmado.password);
      cy.visit('/panel/cuenta');
    });
  });

  describe('Introducir un nuevo nombre', () => {
    beforeEach(() => {
      cy.visit('/panel/cuenta');
      cy.get('input[name="firstName"]').clear();
      cy.get('input[name="firstName"]').type(perfilValido.firstName);
    });

    it('muestra los botones de guardar/cancelar', () => {
      cy.contains('Guardar').should('exist');
      cy.contains('Cancelar').should('exist');
    });
  });

  describe('Introducir un nuevo apellido', () => {
    beforeEach(() => {
      cy.get('input[name="lastName"]').clear();
      cy.get('input[name="lastName"]').type(perfilValido.lastName);
    });

    it('muestra los botones de guardar/cancelar', () => {
      cy.contains('Guardar').should('exist');
      cy.contains('Cancelar').should('exist');
    });
  });

  describe('Introducir nuevo email', () => {
    beforeEach(() => {
      cy.get('input[name="email"]').clear();
      cy.get('input[name="email"]').type(perfilValido.email);
    });

    it('muestra los botones de guardar/cancelar', () => {
      cy.contains('Guardar').should('exist');
      cy.contains('Cancelar').should('exist');
    });

    it('muestra el campo contraseña', () => {
      cy.get('input[name="password"]').should('exist');
    });
  });

  describe('Cancelar edición de formulario', () => {
    beforeEach(() => {
      cy.get('input[name="lastName"]').clear();
      cy.get('input[name="lastName"]').type(perfilValido.lastName);
      cy.contains('Cancelar').click();
    });

    it('oculta los botones de guardar/cancelar', () => {
      cy.get('#modificar-perfil').contains('Guardar').should('not.exist');
      cy.get('#modificar-perfil').contains('Cancelar').should('not.exist');
    });
  });

  describe('Modificar nombre y apellidos', () => {

    describe('Cuando el servidor está disponible', () => {
      beforeEach(() => {
        mockResponses.editarPerfilConExito();
        actualizarPerfil({ firstName: perfilValido.firstName, lastName: perfilValido.lastName });
        cy.wait('@updateProfile');
      });

      it('actualiza la caché', () => {
        cy.contains('Estimación demográfica').click();
        cy.get(selectors.botonMenuBarraSuperior).click();
        cy.contains('Perfil').click();
        cy.get('input[name="firstName"]').should('have.value', perfilValido.firstName);
        cy.get('input[name="lastName"]').should('have.value', perfilValido.lastName);
      });

      it('muestra un mensaje de éxito', () => {
        cy.contains('Perfil actualizado').should('exist');
      });

      it('oculta los botones de guardar/cancelar', () => {
        cy.get('#modificar-perfil').contains('Guardar').should('not.exist');
        cy.get('#modificar-perfil').contains('Cancelar').should('not.exist');
      });
    });

    describe('Cuando el servidor no está disponible', () => {
      beforeEach(() => {
        mockResponses.editarPerfilConError();
        actualizarPerfil({ firstName: perfilValido.firstName, lastName: perfilValido.lastName });
        cy.wait('@updateProfile');
      });

      it('muestra un mensaje de error', () => {
        cy.contains('Error interno').should('exist');
      });
    });
  });

  describe('Editar email', () => {
    describe('Con datos correctos', () => {
      beforeEach(() => {
        mockResponses.editarPerfilConExito();
        actualizarPerfil({ email: perfilValido.email, password: perfilValido.password });
        cy.wait('@updateProfile');
      });

      it('muestra un mensaje informativo', () => {
        cy.contains('Has solicitado editar tu dirección de correo electrónico').should('exist');
      });

      it('no modifica el email', () => {
        cy.get('input[name="email"]').should('not.have.value', perfilValido.email);
      });
    });

    describe('Cuando el email ya estaba registrado', () => {
      beforeEach(() => {
        mockResponses.editarPerfilEmailYaExiste();
        actualizarPerfil({ email: perfilValido.email, password: perfilValido.password });
        cy.wait('@updateProfile');
      });

      it('muestra un mensaje de error', () => {
        cy.contains('ya pertenece a otro usuario').should('exist');
      });
    });
  });

  // TODO https://github.com/cypress-io/cypress/issues/9302
  // describe('Modificar contraseña', () => {
  //   describe('Cuando el servidor está disponible', () => {
  //     describe('Cuando todos los datos son correctos', () => {
  //       beforeEach(() => {
  //         mockResponses.editarContrasenaConExito();
  //         actualizarContrasena(perfilValido.password, perfilValido.password + '1');
  //         cy.wait('@updatePassword');
  //       });

  //       it('muestra un mensaje de éxito', () => {
  //         cy.contains('Contraseña actualizada').should('exist');
  //       });
  //     });
  //   });
  // });
});