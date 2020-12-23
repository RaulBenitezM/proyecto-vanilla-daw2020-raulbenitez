import { crearPrimerUsuario, selectUsuario, crearUsuario } from './general.js';

/**
 * Función para cambiar el código HTML del index para poderse loguear
 */
function mostrarLogin() {
  let principal = document.getElementById('principal');

  principal.innerHTML =
    '<p>Usuario:</p>' +
    '<p><input type="text" id="usuario" name="usuario" /></p>';

  comprobar();
}

//A los 5 segundos de cargar la página saldrá el Login (a menos que se pulse antes Ctrl + F10)
let temp = setTimeout(() => mostrarLogin(), 5000);

window.addEventListener('keyup', (letra) => {
  if (letra.ctrlKey == true && letra.key == 'F10') {
    clearTimeout(temp);
    mostrarLogin();
  }
});

/**
 * Esta funcion añade un EventListener para que cuando se quite el foco del email se compruebe si es correcto, si fuera así se crea el usuario en la cookie o lo recoje si ya existe
 * y redirige a la siguiente pantalla
 */
function comprobar() {
  let inputUsuario = document.getElementById('usuario');

  //Cuando se quite el foco del input de email se comprobará si es correcto o no
  inputUsuario.addEventListener('blur', (event) => {
    let pattern = /\S+@\S+\.\S+/;

    let fecha = new Date();

    //Si el patrón del correo es correcto se comprueba si ya existe la cookie "cuestionario" y si no es así se crea. Si el correo al que intentamos acceder no es correcto, sale un mensaje de error.
    if (pattern.test(inputUsuario.value)) {
      if (!Cookies.get('cuestionario')) {
        crearPrimerUsuario(inputUsuario, fecha);

        //Si sí existe la cookie anterior, se comprueba si el usuario que intentamos acceder está creado, si es así solo recoje el usuario y actualiza su fecha de la última vez iniciado
      } else {
        let cuestionario = JSON.parse(Cookies.get('cuestionario'));

        let existe = false;

        for (usuario of cuestionario) {
          if (usuario.correo == inputUsuario.value) {
            selectUsuario(usuario, cuestionario, fecha);
            existe = true;
          }
        }

        //Si finalmente el usuario al que accedemos no existe, se crea
        if (!existe) {
          crearUsuario(inputUsuario, cuestionario, fecha);
        }
      }

      location.href = 'usuario.html';
    } else {
      let secError = document.getElementById('error');
      secError.innerHTML = '<p>El e-mail es incorrecto!</p>';

      setTimeout(() => {
        inputUsuario.select();
        inputUsuario.focus();
      }, 0);
    }
  });
}
