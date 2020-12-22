//TO-DO Hacer lo de 5 segundos de espera cuando se entre a esta pagina
/**
 * Muestra en el documento HTML los valores de cada apartado de las preguntas que existen en la cookie
 * @param {Object} pregunta
 */
function mostrarPregunta(pregunta) {
  //Utilizo DIV, SECTION y P ya que me viene mejor a la hora de maquetar el HTML
  let list = document.getElementById('list');

  let section = document.createElement('section');

  for (let valor in pregunta) {
    let p = document.createElement('p');
    p.innerHTML = pregunta[valor];
    section.appendChild(p);
  }

  list.appendChild(section);
}

//TO-DO Agregar la pregunta a la cookie, hacer el "Guardando..." de 5 segundos
function agregarPregunta(cuestionario) {
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
    estado: 'OK',
  };

  cuestionario.preguntas.push(pregunta);

  mostrarPregunta(pregunta);
}

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
