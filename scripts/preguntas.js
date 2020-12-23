import { temporizador } from './general.js';

/**
 * Dependiendo de lo que se le pase como parámetro, habrá una carga de 5 segundos antes de que aparezcan las preguntas o no
 * @param {boolean} retraso
 */
async function inicio(retraso) {
  //Si "retraso" es "true" deshabilito el botón de grabar y muestro por pantalla que se están cargando las preguntas.
  //Cuando se termine de cargar, muestro todas las preguntas y habilito de nuevo el botón de grabar.
  if (retraso) {
    btnGrabar.setAttribute('disabled', true);

    let section = document.createElement('section');
    let p = document.createElement('p');
    p.innerHTML = 'Cargando...';
    section.appendChild(p);
    list.appendChild(section);

    let promesaInicio = temporizador(5000);

    await promesaInicio
      .then(() => {
        list.removeChild(section);

        for (let pregunta of usuarioActual.preguntas) {
          mostrarPregunta(pregunta);
        }

        btnGrabar.removeAttribute('disabled');
      })
      .catch(() => {
        console.error('Ha habido un error grave!');
      });
  } else {
    for (let pregunta of usuarioActual.preguntas) {
      mostrarPregunta(pregunta);
    }
  }
}

/**
 * Muestra en el documento HTML los valores de cada apartado de la pregunta pasada
 * @param {Object} pregunta
 */
function mostrarPregunta(pregunta) {
  //Utilizo DIV, SECTION y P ya que me viene mejor a la hora de maquetar el HTML
  let section = document.createElement('section');

  for (let valor in pregunta) {
    var p = document.createElement('p');
    p.innerHTML = pregunta[valor];
    section.appendChild(p);
  }

  list.appendChild(section);

  //Devuelvo el último párrafo (el del estado) para que se pueda acceder y cambiar su contenido a "OK" luego de guardarse (si se necesita hacer)
  return p;
}

/**
 * Se agregan los valores del formulario a una pregunta, en la qual, pasados 5 segundos, se guardará en la cookie "usuarioActual" y en el usuario que estamos ahora dentro de la cookie "cuestionario"
 * @param {*} usuarioActual
 */
async function agregarPregunta(usuarioActual) {
  //Deshabilito el botón atrás
  btnAtras.setAttribute('disabled', true);

  //Recojo la información del formulario para después guardarla en un objeto "pregunta"
  let titulo = document.getElementById('pregunta').value;

  let respuesta;

  for (let radio of document.getElementsByName('respuesta')) {
    if (radio.checked) respuesta = radio.value;
  }

  let puntuacion = document.getElementById('puntuacion').value;

  let pregunta = {
    titulo: titulo,
    respuesta: respuesta,
    puntuacion: puntuacion,
    estado: 'Guardando...',
  };

  //Muestro la pregunta en el documento HTML con el estado "Guardando..."
  let p = mostrarPregunta(pregunta);

  //Cuando se borre el formulario desactivo también el botón de grabar
  document.getElementById('formpreguntas').reset();
  btnGrabar.setAttribute('disabled', true);

  let promesa = temporizador(5000);

  //Si se han pasado los 5 segundos del temporizador correctamente, el estado de la pregunta pasa a ser "OK", agrego la pregunta al usuario actual y a sus respectivas cookies
  //y muestro por pantalla que se ha guardado la pregunta correctamente
  await promesa
    .then(() => {
      pregunta.estado = 'OK';

      usuarioActual.preguntas.push(pregunta);

      //TO-DO Problema no deja crear un string de usuarioActual
      let strUsuarioActual = JSON.stringify(usuarioActual);

      Cookies.set('usuarioActual', strUsuarioActual);

      let cuestionarioGeneral = JSON.parse(Cookies.get('cuestionario'));

      for (let usuario of cuestionarioGeneral) {
        if (usuarioActual.correo == usuario.correo) {
          usuario.preguntas.push(pregunta);

          let strCuestionarioGeneral = JSON.stringify(cuestionarioGeneral);

          Cookies.set('cuestionario', strCuestionarioGeneral, { expires: 7 });
        }
      }

      //Cambio el texto del párrafo que contiene el estado de la pregunta actual
      p.innerHTML = pregunta.estado;
    })
    .catch(() => {
      pregunta.estado = 'ERROR';

      p.innerHTML = pregunta.estado;
    });

  let pEstadoLastSection = document.querySelector(
    '#list section:last-child p:last-child'
  );

  //Cada vez que se termina de guardar una pregunta compruebo que la última pregunta añadida tenga el estado "OK". Si lo tiene, el botón de atrás se habilitará de nuevo.
  //Si no es así, el botón no se habilitará.
  if (pEstadoLastSection.textContent === 'OK') {
    btnAtras.removeAttribute('disabled');
  }
}

/**
 * Comprueba si los inputs están llenos o no
 */
function comprobarInputs() {
  let inputPregunta = document.getElementById('pregunta');
  let inputRespuesta;

  for (let radio of document.getElementsByName('respuesta')) {
    if (radio.checked) {
      inputRespuesta = radio.value;
      break;
    } else {
      inputRespuesta = '';
    }
  }

  let inputPuntuacion = document.getElementById('puntuacion');

  //Si al modificar cualquier input del formulario hay alguno sin valor, el botón grabar no se activa, en cambio, si todos los inputs tienen valor, se activará para poder agregar la pregunta.
  if (
    inputPregunta.value != '' &&
    inputRespuesta != '' &&
    inputPuntuacion.value != ''
  ) {
    btnGrabar.removeAttribute('disabled');
  } else {
    btnGrabar.setAttribute('disabled', true);
  }
}

//Inicializo estas variable al inicio para utilizarlas luego
let btnGrabar = document.getElementById('grabar');
let btnAtras = document.getElementById('atras');
let list = document.getElementById('list');
let usuarioActual = JSON.parse(Cookies.get('usuarioActual'));

window.addEventListener('load', () => {
  btnGrabar.setAttribute('disabled', true);
  inicio(false);
});

window.addEventListener('submit', (event) => {
  event.preventDefault();

  agregarPregunta(usuarioActual);
});

let form = document.getElementById('formpreguntas');

form.addEventListener('change', () => comprobarInputs());
