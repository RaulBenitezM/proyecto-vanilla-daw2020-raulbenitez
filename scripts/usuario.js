let usuarioActual = JSON.parse(Cookies.get('usuarioActual'));

//Muestro por pantalla la información del usuario que hemos accedido
let p1 = document.getElementById('p1');
let p2 = document.getElementById('p2');

p1.innerHTML = 'Hola ' + usuarioActual.correo;
p2.innerHTML =
  'La última vez que entraste fue el ' +
  usuarioActual.fechaHora.day +
  '-' +
  usuarioActual.fechaHora.month +
  '-' +
  usuarioActual.fechaHora.year +
  ' a las ' +
  usuarioActual.fechaHora.hour +
  ':' +
  usuarioActual.fechaHora.minute +
  ':' +
  usuarioActual.fechaHora.second;
