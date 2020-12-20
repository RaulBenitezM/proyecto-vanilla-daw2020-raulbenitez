//TO-DO Poner comentarios
let cuestionario = JSON.parse(Cookies.get('cuestionario'));

console.log(JSON.stringify(cuestionario));

let p1 = document.getElementById('p1');

let p2 = document.getElementById('p2');

p1.innerHTML = 'Hola ' + cuestionario[0].correo;

p2.innerHTML =
  'La última vez que entraste fue el ' +
  cuestionario[0].fechaHora.day +
  '-' +
  cuestionario[0].fechaHora.month +
  '-' +
  cuestionario[0].fechaHora.year +
  ' a las ' +
  cuestionario[0].fechaHora.hour +
  ':' +
  cuestionario[0].fechaHora.minute +
  ':' +
  cuestionario[0].fechaHora.second;
