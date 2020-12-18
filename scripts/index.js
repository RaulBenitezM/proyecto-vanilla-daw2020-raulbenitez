/**
 * Función para cambiar el código HTML del index para poderse loguear
 */
function mostrarLogin() {
  let principal = document.getElementById('principal');

  principal.innerHTML =
    '<p>Usuario:</p>' +
    '<p><input type="text" id="usuario" name="usuario" /></p>';
}

//A los 5 segundos de cargar la página saldrá el Login (a menos que se pulse antes Ctrl + F10)
let temp = setTimeout(() => mostrarLogin(), 5000);

window.addEventListener('keyup', (letra) => {
  if (letra.ctrlKey == true && letra.key == 'F10') {
    clearTimeout(temp);
    mostrarLogin();
  }
});

//Cuando se quite el foco del input de email se comprobará si es correcto o no
window.addEventListener('blur', (event) => {
  let inputUsuario = document.getElementById('usuario');

  let pattern = /\S+@\S+\.\S+/;

  if (pattern.test(inputUsuario.value)) {
    let fecha = new Date();

    let cuestionario = [
      {
        correo: inputUsuario.value,
        fechaHora: {
          day: fecha.getDay(),
          month: fecha.getMonth(),
          year: fecha.getFullYear(),
          hour: fecha.getHours(),
          minute: fecha.getMinutes(),
          second: fecha.getSeconds(),
        },
        preguntas: [],
      },
    ];

    strCuestionario = JSON.stringify(cuestionario);

    Cookies.set('cuestionario', strCuestionario, { expires: 7 });

    location.href = 'usuario.html';
  } else {
    let secError = document.getElementById('error');
    secError.innerHTML = '<p>El e-mail es incorrecto!</p>';

    //TO-DO No funciona el foco al ser incorrecto
    setTimeout(() => {
      inputUsuario.focus();
      inputUsuario.select();
    }, 0);
  }
});
