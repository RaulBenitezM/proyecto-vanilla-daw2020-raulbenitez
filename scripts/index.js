/**
 * Función para cambiar el código HTML del index para poderse loguear
 */
function mostrarLogin() {
  body.innerHTML =
    '<p>Usuario:</p>' +
    '<p><input type="text" id="usuario" name="usuario" /></p>';
}

let body = document.body;

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

  //TO-DO Cambiar regexp de prueba
  let pattern = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+).([a-zA-Z0-9_\-.]+)$/;
  if (pattern.test(inputUsuario.value)) {
    //TO-DO Guardar el correo
    location.href = 'usuario.html';
  } else {
    //TO-DO Cambiar para que solo aparezca una vez lo de email incorrecto
    let pError = document.createElement('p');
    pError.setAttribute('id', 'error');
    pError.innerHTML = 'El e-mail es incorrecto!';
    body.appendChild(pError);
    //TO-DO No funciona el foco al ser incorrecte
    //inputUsuario.focus();
    //inputUsuario.select();
  }
});
