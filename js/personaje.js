const characters = document.querySelectorAll('.character-personajes');

function selectCharacter(selectedCharacter) {
  characters.forEach((character) => {
    if (character !== selectedCharacter) {
      character.classList.add('grayed-out');
      character.querySelector('button').disabled = true;
    } else {
      character.classList.remove('grayed-out');
      character.querySelector('button').disabled = false;
    }
  });

  const otherCharactersButton = document.getElementById('other-characters-button');
  if (selectedCharacter) {
    otherCharactersButton.classList.remove('hidden');
  } else {
    otherCharactersButton.classList.add('hidden');
  }
}

characters.forEach((character) => {
  character.querySelector('button').addEventListener('click', () => {
    selectCharacter(character);
  });
});

const botonesPersonajes = document.querySelectorAll('.buy-button-personajes');

botonesPersonajes.forEach((boton) => {
  boton.addEventListener('click', seleccionarPersonaje);
});

function seleccionarPersonaje(event) {
  botonesPersonajes.forEach((boton) => {
    boton.disabled = true;
    boton.classList.add('unselected');
    boton.style.backgroundColor = '';
  });

  const botonSeleccionado = event.target;
  botonSeleccionado.classList.remove('unselected');
  botonSeleccionado.style.backgroundColor = 'green';
  botonSeleccionado.disabled = true;
  botonSeleccionado.innerText = 'Seleccionado';

  const refreshButton = document.getElementById('refresh-button');
  refreshButton.classList.remove('hidden');
  
  const characterCard = event.target.closest('.character-personajes');
  characters.forEach((character) => {
    if (character === characterCard) {
      character.classList.add('selected');
    } else {
      character.classList.remove('selected');
    }
  });
}

const refreshButton = document.getElementById('refresh-button');
refreshButton.addEventListener('click', refreshPage);

function refreshPage() {
  location.reload();
}

const selectAnotherButton = document.getElementById('other-characters-button');
selectAnotherButton.addEventListener('click', selectAnotherCharacter);

function selectAnotherCharacter() {
  characters.forEach((character) => {
    character.classList.remove('grayed-out');
    character.querySelector('button').disabled = false;
    character.classList.remove('selected');
  });

  const refreshButton = document.getElementById('refresh-button');
  refreshButton.classList.add('hidden');
}

const characterButtons = document.querySelectorAll('.buy-button');
characterButtons.forEach(button => {
  button.addEventListener('click', () => {
    characterButtons.forEach(btn => btn.parentElement.classList.remove('selected'));
    button.parentElement.classList.add('selected');
  });
});
function cambiarprecio(event) {
  var boton = event.target;
  var character = boton.parentElement.parentElement;

  // Quitamos la clase 'selected' de todos los personajes
  var characters = document.querySelectorAll('.character-personajes');
  characters.forEach(function (character) {
    character.classList.remove('selected');
  });

  // Añadimos la clase 'selected' al personaje seleccionado
  character.classList.add('selected');
}
function mostrarMensaje() {
  const mensaje = document.getElementById("mensaje");
  mensaje.innerHTML = "¡Seleccionado!";
  mensaje.style.display = "block";
  setTimeout(function() {
    mensaje.style.display = "none";
  }, 2000); // 2000 milisegundos = 2 segundos
}