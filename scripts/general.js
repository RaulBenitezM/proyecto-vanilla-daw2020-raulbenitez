/**
 * Función para crear el primer usuario de la cookie "cuestionario" y guardarlo en la cookie "usuarioActual" para poder utilizarlo
 * @param {HTMLElement} inputUsuario
 * @param {Date} fecha
 */
function crearPrimerUsuario(inputUsuario, fecha) {
  let cuestionario = [
    {
      correo: inputUsuario.value,
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

  let strCuestionario = JSON.stringify(cuestionario);

  Cookies.set('cuestionario', strCuestionario, { expires: 7 });

  let usuarioActual = cuestionario[0];

  let strUsuarioActual = JSON.stringify(usuarioActual);

  Cookies.set('usuarioActual', strUsuarioActual);
}

/**
 * Función para seleccionar el usuario al que intentamos acceder y guardarlo en otra cookie para poder utilizarlo
 * @param {Object} usuario
 * @param {Array} cuestionario
 * @param {Date} fecha
 */
function selectUsuario(usuario, cuestionario, fecha) {
  let usuarioActual = usuario;

  let strUsuarioActual = JSON.stringify(usuarioActual);

  Cookies.set('usuarioActual', strUsuarioActual);

  usuario.fechaHora = {
    day: fecha.getDate(),
    //Se le suma 1 al mes ya que lo que te devuelve la función getMonth() es un numero de 0-11
    month: fecha.getMonth() + 1,
    year: fecha.getFullYear(),
    hour: fecha.getHours(),
    minute: fecha.getMinutes(),
    second: fecha.getSeconds(),
  };

  let strCuestionario = JSON.stringify(cuestionario);

  Cookies.set('cuestionario', strCuestionario, { expires: 7 });
}

/**
 * Función para crear un usuario en la cookie "cuestionario" y guardarlo en otra cookie para poder utilizarlo
 * @param {HTMLElement} inputUsuario
 * @param {Array} cuestionario
 * @param {Date} fecha
 */
function crearUsuario(inputUsuario, cuestionario, fecha) {
  let usuario = {
    correo: inputUsuario.value,
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

  let strCuestionario = JSON.stringify(cuestionario);

  Cookies.set('cuestionario', strCuestionario, { expires: 7 });

  let usuarioActual = usuario;

  let strUsuarioActual = JSON.stringify(usuarioActual);

  Cookies.set('usuarioActual', strUsuarioActual);
}

/**
 * Temporizador
 * @param {number} miliseg
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

export { crearPrimerUsuario, selectUsuario, crearUsuario, temporizador };
