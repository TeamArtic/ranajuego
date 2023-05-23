const movementContainer2 = document.getElementById('movementContainer2');
const text = document.getElementById('text');
const image = document.getElementById('image');
const message = "¡Bienvenido al emocionante mundo de las Tortugas Ninja! En este juego, tendrás la oportunidad de unirte a tus tortugas favoritas en una misión peligrosa pero crucial para salvar la ciudad de Nueva York del Clan del Pie. Solo tú y tus habilidades ninja podrán salvar la ciudad de Nueva York del malvado Clan del Pie. ¡Prepárate para una aventura emocionante y llena de acción!";

let index = 0;
function typeWriter() {
  if (index < message.length) {
    text.innerHTML += message.charAt(index);
    index++;
    setTimeout(typeWriter, 40);
  } else {
    image.style.display = 'inline-block';
    image.style.width = '280px';
  }
}
typeWriter();

document.getElementById('foregroundContainer');
setTimeout(() => {
  foregroundContainer.style.display = 'none';
}, 4000); // 500ms de retraso antes de cambiar a 'display:none';

const tortugasgif1 = document.querySelector('.tortugasgif1');
const tortugasgif2 = document.querySelector('.tortugasgif2');
const tortugasgif3 = document.querySelector('.tortugasgif3');
const tortugasgif4 = document.querySelector('.tortugasgif4');

tortugasgif1.addEventListener('mouseenter', () => {
  tortugasgif1.style.boxShadow = '0 0 20px rgba(255, 255, 0, 0.5)';
});

tortugasgif1.addEventListener('mouseleave', () => {
  tortugasgif1.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
});

tortugasgif2.addEventListener('mouseenter', () => {
  tortugasgif2.style.boxShadow = '0 0 20px rgba(255, 255, 0, 0.5)';
});

tortugasgif2.addEventListener('mouseleave', () => {
  tortugasgif2.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
});

tortugasgif3.addEventListener('mouseenter', () => {
  tortugasgif3.style.boxShadow = '0 0 20px rgba(255, 255, 0, 0.5)';
});

tortugasgif3.addEventListener('mouseleave', () => {
  tortugasgif3.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
});

tortugasgif4.addEventListener('mouseenter', () => {
  tortugasgif4.style.boxShadow = '0 0 20px rgba(255, 255, 0, 0.5)';
});

tortugasgif4.addEventListener('mouseleave', () => {
  tortugasgif4.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
});

function cambiarImagen(ruta) {
  var imagen = document.getElementById("rana");
  imagen.src = ruta + ".gif";
}