//TO-DO Poner comentarios
let cuestionario = JSON.parse(Cookies.get('cuestionario'));

let p1 = document.getElementById('p1');

let p2 = document.getElementById('p2');

p1.innerHTML = 'Hola ' + cuestionario.correo;

p2.innerHTML =
  'La última vez que entraste fue el ' +
  cuestionario.fechaHora.day +
  '-' +
  cuestionario.fechaHora.month +
  '-' +
  cuestionario.fechaHora.year +
  ' a las ' +
  cuestionario.fechaHora.hour +
  ':' +
  cuestionario.fechaHora.minute +
  ':' +
  cuestionario.fechaHora.second;
