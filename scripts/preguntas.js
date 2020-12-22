/**
 *
 * @param {*} miliseg
 */
function temporizador(miliseg) {
  return new Promise(function (resolver, rechazar) {
    setTimeout(() => {
      resolver();
    }, miliseg);

    setTimeout(() => {
      rechazar();
    }, miliseg * 2);
  });
}

//TO-DO Hacer lo de 5 segundos de espera cuando se entre a esta pagina
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

  //Devuelvo el último párrafo (el del estado) para que se pueda acceder y cambiar su contenido a "OK" luego de guardarse
  return p;
}

//TO-DO Agregar la pregunta a la cookie, hacer el "Guardando..." de 5 segundos
async function agregarPregunta(cuestionario) {
  let btnAtras = document.getElementById('atras');

  btnAtras.setAttribute('disabled', true);

  let titulo = document.getElementById('pregunta').value;

  let respuesta;

  for (radio of document.getElementsByName('respuesta')) {
    if (radio.checked) respuesta = radio.value;
  }

  let puntuacion = document.getElementById('puntuacion').value;

  let pregunta = {
    titulo: titulo,
    respuesta: respuesta,
    puntuacion: puntuacion,
    estado: 'Guardando...',
  };

  let p = mostrarPregunta(pregunta);

  //Borro el formulario
  document.getElementById('formpreguntas').reset();

  let promesa = temporizador(5000);

  await promesa
    .then(() => {
      pregunta.estado = 'OK';

      cuestionario.preguntas.push(pregunta);

      strCuestionario = JSON.stringify(cuestionario);

      Cookies.set('cuestionario', strCuestionario, { expires: 7 });

      //Cambio el texto del párrafo que contiene el estado de la pregunta actual
      p.innerHTML = pregunta.estado;

      cuestionario = JSON.parse(Cookies.get('cuestionario'));
    })
    .catch(() => {
      pregunta.estado = 'ERROR';

      p.innerHTML = pregunta.estado;
    });

  let pEstadoLastSection = document.querySelector(
    '#list section:last-child p:last-child'
  );

  if (pEstadoLastSection.textContent === 'OK') {
    btnAtras.removeAttribute('disabled');
  }
}

let btnGrabar = document.getElementById('grabar');

//Cargo el div que contiene la lista de preguntas para que luego se vayan agregando
let list = document.getElementById('list');

let cuestionario = JSON.parse(Cookies.get('cuestionario'));

window.addEventListener('load', () => {
  for (let pregunta of cuestionario.preguntas) {
    mostrarPregunta(pregunta);
  }
});

window.addEventListener('submit', (event) => {
  event.preventDefault();

  agregarPregunta(cuestionario);
});

window.addEventListener('blur', () => {});

function comprobarInputs() {
  let inputPregunta = document.getElementById('pregunta');

  let inputRespuesta;

  for (radio of document.getElementsByName('respuesta')) {
    if (radio.checked) inputRespuesta = radio.value;
  }

  let inputPuntuacion = document.getElementById('puntuacion');

  console.log(inputPregunta.value);

  console.log(inputRespuesta.value);

  console.log(inputPuntuacion.value);

  if (
    inputPregunta.value != null &&
    inputRespuesta.value != null &&
    inputPuntuacion != null
  ) {
    btnAtras.removeAttribute('disabled');
  }
}
