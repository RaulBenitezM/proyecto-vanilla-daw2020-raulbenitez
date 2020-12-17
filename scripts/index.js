/**
 * Función para cambiar el código HTML del index para poderse loguear
 */
function mostrarLogin() {
  let principal = document.getElementById('principal');

  principal.innerHTML =
    '<p>Usuario:</p>' +
    '<p><input type="text" id="usuario" name="usuario" /></p>';
}

// PRUEBAS PARA EL JSON CUESTIONARIO

let fecha = new Date();

let cuestionario = [
  {
    correo: 'raul@gmail.com',
    fecha: fecha.toUTCString(),
    preguntas: [
      {
        titulo: 'Pregunta 1',
        respuesta: true,
        puntuacion: 2,
      },
    ],
  },
];

console.log(JSON.stringify(cuestionario));

let persona = {
  correo: 'raul2@gmail.com',
  fecha: fecha.toUTCString(),
  preguntas: [
    {
      titulo: 'Pregunta 1',
      respuesta: false,
      puntuacion: 4,
    },
  ],
};

cuestionario.push(persona);

console.log(JSON.stringify(cuestionario));

// FIN DE PRUEBA PARA EL JSON CUESTIONARIO

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
    //let fecha = new Date();
    //console.log(fecha.getHours());
    //console.log(fecha.getMinutes());
    //console.log(fecha.getSeconds());
    //console.log(cookie);
    //location.href = 'usuario.html';
  } else {
    let secError = document.getElementById('error');
    secError.innerHTML = '<p>El e-mail es incorrecto!</p>';
    //TO-DO No funciona el foco al ser incorrecte
    setTimeout(() => {
      inputUsuario.focus();
      inputUsuario.select();
    }, 0);
  }
});
