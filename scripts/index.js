import { crearPrimerUsuario, crearUsuario, selectUsuario } from './general.js';

/**
 * Se cambia el código HTML para que se muestre el Login
 */
let mostrarLogin = function () {
  let secPrincipal = document.getElementById('principal');

  principal.innerHTML =
    '<p>Usuario:</p>' +
    '<p><input type="text" id="usuario" name="usuario" /></p>';

  comprobar();
};

//A los 5 segundos de cargarse la página, o cuando se pulse CTRL + F10, saldrá el login
let temp = setTimeout(() => mostrarLogin(), 5000);

window.addEventListener('keyup', (event) => {
  if (event.ctrlKey == true && event.key == 'F10') {
    clearTimeout(temp);
    mostrarLogin();
  }
});

function comprobar() {
  let inputUsuario = document.getElementById('usuario');

  //Cuando se quite el foco del input se comprobará si es correcto o no
  inputUsuario.addEventListener('blur', (event) => {
    let patron = /\S+@\S+\.\S+/;

    let fechaActual = new Date();

    //Si el patrón del correo es correcto, se comprueba si la Cookie "cuestionario" existe, si no existe se crea una nueva
    //Si el patrón del correo es incorrecto, sale un mensaje y se selecciona el texto del input
    if (patron.test(inputUsuario.value)) {
      if (!Cookies.get('cuestionario')) {
        crearPrimerUsuario(inputUsuario.value, fechaActual);
      } else {
        let cuestionario = JSON.parse(Cookies.get('cuestionario'));

        let existe = false;

        for (usuario of cuestionario) {
          if (usuario.correo == inputUsuario.value) {
            selectUsuario(usuario, cuestionario, fechaActual);
            existe = true;
          }
        }

        //Si no existe el usuario al que intentamos acceder, se crea este
        if (!existe)
          crearUsuario(inputUsuario.value, cuestionario, fechaActual);
      }

      //Cuando se haya elegido el usuario o creado uno nuevo, se cambia la página a "usuario.html"
      location.href = 'usuario.html';
    } else {
      let secError = document.getElementById('error');
      secError.innerHTML = '<p>¡El e-mail es incorrecto!</p>';

      setTimeout(() => {
        inputUsuario.focus();
        inputUsuario.select();
      }, 0);
    }
  });
}
