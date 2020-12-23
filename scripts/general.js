/**
 * Guarda en la cookie "cuestionario", todos los cambios del cuestionario que se hacen
 * @param {Array} cuestionario Cuestionario completo con todos los usuarios y todas las preguntas
 */
let guardarCuestionario = function (cuestionario) {
  let strCuestionario = JSON.stringify(cuestionario);
  Cookies.set('cuestionario', strCuestionario, { expires: 7 });
};

/**
 * Guarda en la cookie "usuarioActual", el usuario al que se intenta acceder
 * @param {Object} usuario Objeto "Usuario" que se quiere guardar en la cookie "usuarioActual"
 */
let guardarUsuarioActual = function (usuario) {
  let strUsuarioActual = JSON.stringify(usuario);
  Cookies.set('usuarioActual', strUsuarioActual);
};

/**
 * Se crea el primer usuario de la cookie "cuestionario" y se guarda en la cookie "usuarioActual" para poder utilizarlo
 * @param {String} valorUsuario Valor del input usuario
 * @param {Date} fecha Fecha actual
 */
function crearPrimerUsuario(valorUsuario, fecha) {
  let cuestionario = [
    {
      correo: valorUsuario,
      fechaHora: {
        day: fecha.getDate(),
        //Se le suma 1 al mes ya que lo que te devuelve la función getMonth() es un numero de 0-11
        month: fecha.getMonth() + 1,
        year: fecha.getFullYear(),
        hour: fecha.getHours(),
        minute: fecha.getMinutes(),
        second: fecha.getSeconds(),
      },
      preguntas: [],
    },
  ];

  guardarCuestionario(cuestionario);

  guardarUsuarioActual(cuestionario[0]);
}

/**
 * Función para seleccionar el usuario al que intentamos acceder y guardarlo en otra cookie para poder utilizarlo
 * @param {Object} usuario Objeto "Usuario" que se quiere seleccionar
 * @param {Array} cuestionario Cuestionario completo con todos los usuarios y todas las preguntas
 * @param {Date} fecha Fecha actual
 */
function selectUsuario(usuario, cuestionario, fecha) {
  guardarUsuarioActual(usuario);

  usuario.fechaHora = {
    day: fecha.getDate(),
    //Se le suma 1 al mes ya que lo que te devuelve la función getMonth() es un numero de 0-11
    month: fecha.getMonth() + 1,
    year: fecha.getFullYear(),
    hour: fecha.getHours(),
    minute: fecha.getMinutes(),
    second: fecha.getSeconds(),
  };

  guardarCuestionario(cuestionario);
}

/**
 * Función para crear un usuario en la cookie "cuestionario" y guardarlo en otra cookie para poder utilizarlo
 * @param {String} valorUsuario Valor del input usuario
 * @param {Array} cuestionario Cuestionario completo con todos los usuarios y todas las preguntas
 * @param {Date} fecha Fecha actual
 */
function crearUsuario(valorUsuario, cuestionario, fecha) {
  let usuario = {
    correo: valorUsuario,
    fechaHora: {
      day: fecha.getDate(),
      //Se le suma 1 al mes ya que lo que te devuelve la función getMonth() es un numero de 0-11
      month: fecha.getMonth() + 1,
      year: fecha.getFullYear(),
      hour: fecha.getHours(),
      minute: fecha.getMinutes(),
      second: fecha.getSeconds(),
    },
    preguntas: [],
  };

  cuestionario.push(usuario);

  guardarCuestionario(cuestionario);

  guardarUsuarioActual(usuario);
}

/**
 * Temporizador que se resuelve correctamente si han pasado los segundos que se han especificado o
 * da error si ha pasado el doble de tiempo (es decir, algo ha pasado erróneamente)
 * @param {number} miliseg Milisegundos para el temporizador
 * @returns {Promise} Promesa para acceder al "resolve" y "reject"
 */
function temporizador(miliseg) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve();
    }, miliseg);

    setTimeout(() => {
      reject();
    }, miliseg * 2);
  });
}

export {
  crearPrimerUsuario,
  selectUsuario,
  crearUsuario,
  guardarCuestionario,
  guardarUsuarioActual,
  temporizador,
};
