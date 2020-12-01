import selectors from "../../common/selectors";

describe('Registro', () => {

  const registrar = (usuario) => {
    cy.visit('/registro');
    if(usuario && usuario.email && usuario.email.length > 0) {
      cy.get('input[name="email"]').type(usuario.email);
    }
    if(usuario && usuario.password && usuario.password.length > 0) {
      cy.get('input[name="password"]').type(usuario.password);
    }
    cy.get('form').submit();
    cy.wait(3000);
  };

  describe('Registrar una cuenta con datos válidos', () => {

    let usuario = {
      email: '',
      password: ''
    };

    beforeEach(() => {
      cy.fixture('usuarios').then(({ validoNoRegistrado }) => {
        usuario.email = '' + Math.random() + validoNoRegistrado.email;
        usuario.password = validoNoRegistrado.password;
        registrar(usuario);
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

  describe('Intentar registrar una cuenta con datos inválidos', () => {
    const intentarRegistrarInvalido = (usuario, errorEsperado) => {
      registrar(usuario);
      if(errorEsperado) {
        cy.contains(selectors.errorCampoFormulario, errorEsperado).should('exist');
      }
    };

    it('muestra un error en el campo Email si está en blanco', () => {
      cy.fixture('usuarios').then(({ validoNoRegistrado : usuario }) => {
        usuario.email = '';
        intentarRegistrarInvalido(usuario, 'Introduce tu email');
      });
    });

    it('muestra un error en el campo Email si no es un email válido', () => {
      cy.fixture('usuarios').then(({ validoNoRegistrado : usuario }) => {
        usuario.email = 'abc';
        intentarRegistrarInvalido(usuario, 'No es una dirección de email válida');
      });
    });

    it('elimina el error en el campo Email cuando se introduce un email válido', () => {
      cy.fixture('usuarios').then(({ validoNoRegistrado : usuario }) => {
        let usuarioInvalido = {};
        usuarioInvalido.email = 'abc';
        usuarioInvalido.password = usuario.password;
        intentarRegistrarInvalido(usuarioInvalido);
        cy.get('input[name="email"]').click();
        cy.get('input[name="email"]').clear()
        cy.get('input[name="email"]').type(usuario.email);
        cy.get(selectors.errorCampoFormulario).should('not.exist');
      });
    });

    it('muestra un error en el campo Contraseña si está en blanco', () => {
      cy.fixture('usuarios').then(({ validoNoRegistrado : usuario }) => {
        usuario.password = '';
        intentarRegistrarInvalido(usuario, 'Introduce tu contraseña');
      });
    });

    it('muestra un error en el campo Contraseña si no contiene minúsculas', () => {
      cy.fixture('usuarios').then(({ validoNoRegistrado : usuario }) => {
        usuario.password = 'AAAAAA1.1.1.';
        intentarRegistrarInvalido(usuario, 'La contraseña debe tener al menos una letra minúscula');
      });
    });

    it('muestra un error en el campo Contraseña si no contiene mayúsculas', () => {
      cy.fixture('usuarios').then(({ validoNoRegistrado : usuario }) => {
        usuario.password = 'aaaaaa1.1.1.';
        intentarRegistrarInvalido(usuario, 'La contraseña debe tener al menos una letra mayúscula');
      });
    });

    it('muestra un error en el campo Contraseña si no contiene mayúsculas', () => {
      cy.fixture('usuarios').then(({ validoNoRegistrado : usuario }) => {
        usuario.password = 'aaaAAA......';
        intentarRegistrarInvalido(usuario, 'La contraseña debe tener al menos un número');
      });
    });

    it('muestra un error en el campo Contraseña si no contiene símbolos', () => {
      cy.fixture('usuarios').then(({ validoNoRegistrado : usuario }) => {
        usuario.password = 'aaaAAA111111';
        intentarRegistrarInvalido(usuario, 'La contraseña debe tener al menos un símbolo');
      });
    });

    // it('muestra un error en el campo Contraseña si es demasiado corta', () => {
    //   cy.fixture('usuarios').then(({ validoNoRegistrado : usuario }) => {
    //     usuario.password = 'aA1.';
    //     intentarRegistrarInvalido(usuario, 'La contraseña debe tener al menos 6 caracteres');
    //   });
    // });

    it('elimina el error en el campo Contraseña cuando se introduce una contraseña válidas', () => {
      cy.fixture('usuarios').then(({ validoNoRegistrado : usuario }) => {
        let usuarioInvalido = {};
        usuarioInvalido.email = usuario.email;
        usuarioInvalido.password = '';
        intentarRegistrarInvalido(usuario);
        cy.get('input[name="password"]').type(usuario.password);
        cy.get(selectors.errorCampoFormulario).should('not.exist');
      });
    });
  });

  describe('Intentar registrar una cuenta ya registrada', () => {

    it('muestra un mensaje de error tras cargar', () => {
      cy.fixture('usuarios').then(({ validoRegistrado : usuario }) => {
        registrar(usuario);
        cy.waitUntil(() => {
          return cy
            .get(selectors.spinner)
            .should('not.exist')
            .then(() => {
              return cy.contains('La dirección de email ya se encuentra registrada').should('exist');
            });
        });
      });
    });
  });
});