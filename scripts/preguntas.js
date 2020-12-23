import {
  guardarCuestionario,
  guardarUsuarioActual,
  temporizador,
} from './general.js';

/**
 * Dependiendo de lo que se le pase como parámetro, habrá una carga de 5 segundos antes de que aparezcan las preguntas o no
 * @param {boolean} retraso Si es verdadero hay un retraso al cargar las preguntas, si es falso no
 */
async function inicio(retraso = false, callback) {
  //Si "retraso" es "true" deshabilito el botón de grabar y muestro por pantalla que se están cargando las preguntas.
  //Cuando se termine de cargar, muestro todas las preguntas y habilito de nuevo el botón de grabar.
  if (retraso) {
    btnGrabar.setAttribute('disabled', true);

    let section = document.createElement('section');
    section.innerHTML = 'Cargando preguntas...';
    list.appendChild(section);

    let tempInicio = callback(5000);

    await tempInicio
      .then(() => {
        list.removeChild(section);

        for (let pregunta of usuarioActual.preguntas) {
          mostrarPregunta(pregunta);
        }
      })
      .catch(() => {
        section.innerHTML = '¡Ha habido un error al mostrar las preguntas!';
      });
  } else {
    for (let pregunta of usuarioActual.preguntas) {
      mostrarPregunta(pregunta);
    }
  }
}

/**
 * Muestra en el documento HTML los valores de cada apartado de la pregunta pasada
 * @param {Object} pregunta Pregunta que se quiere mostrar en el documento HTML
 * @returns {HTMLParagraphElement} Párrafo para poder acceder a este y poder cambiar su estado a "OK"
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
  return p;
}

async function agregarPregunta(usuarioActual) {
  //Deshabilito el botón atrás cuando se está agregando la pregunta
  btnAtras.setAttribute('disabled', true);

  //Recojo ela información del formulario para después guardarla en un objeto "pregunta"
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

  //Muestro la pregunta en el document HTML con el estado "Guardando..."
  let p = mostrarPregunta(pregunta);

  //Cuando se borre el formulario desactivo también el botón "Grabar"
  form.reset();
  btnGrabar.setAttribute('disabled', true);

  let temp = temporizador(5000);

  //Si se han pasado los 5 segundos del temporizador correctamente, el estado de la pregunta pasa a ser "OK", agrego la pregunta al usuario actual y a sus respectivas cookies
  //y muestro por pantalla que se ha guardado la pregunta correctamente
  await temp
    .then(() => {
      pregunta.estado = 'OK';

      usuarioActual.preguntas.push(pregunta);
      guardarUsuarioActual(usuarioActual);

      let cuestionarioGeneral = JSON.parse(Cookies.get('cuestionario'));

      for (let usuario of cuestionarioGeneral) {
        if (usuarioActual.correo == usuario.correo) {
          usuario.preguntas.push(pregunta);
          guardarCuestionario(cuestionarioGeneral);
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
  if (pEstadoLastSection.textContent === 'OK')
    btnAtras.removeAttribute('disabled');
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
  }
}

//Inicializo estas variables al inicio para utilizarlas luego
let btnGrabar = document.getElementById('grabar');
let btnAtras = document.getElementById('atras');
let list = document.getElementById('list');
let usuarioActual = JSON.parse(Cookies.get('usuarioActual'));
let form = document.getElementById('formpreguntas');

window.addEventListener('load', () => {
  btnGrabar.setAttribute('disabled', true);
  inicio(true, temporizador);
});

window.addEventListener('submit', (event) => {
  event.preventDefault();

  agregarPregunta(usuarioActual);
});

form.addEventListener('change', () => comprobarInputs());
