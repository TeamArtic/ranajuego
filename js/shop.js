var dinero = 100;

var Tortugas = [
  { nombre: 'Jennika', precio: '10' },
  { nombre: 'Leo', precio: '10' },
  { nombre: 'Rafael', precio: '15' },
  { nombre: 'Michelangelo', precio: '25' }
];

function comprarRealizada() {
  var divCompra = document.createElement("div");
  divCompra.innerText = "¡Compra realizada!";
  divCompra.classList.add("compra-realizada");
  document.body.appendChild(divCompra);
  setTimeout(function() {
    divCompra.style.opacity = "1";
  }, 100);
  setTimeout(function() {
    divCompra.style.opacity = "0";
  }, 1500);
  setTimeout(function() {
    divCompra.remove();
  }, 2000);
}

function cambiarprecio(event) {
  var personaje = event.target.parentElement.querySelector('h3').textContent;
  var boton = event.target;
  for (var i = 0; i < Tortugas.length; i++) {
    if (personaje == Tortugas[i].nombre && dinero - Tortugas[i].precio >= 0) {
      if (personaje == Tortugas[i].nombre) {
        dinero -= Tortugas[i].precio;
        document.getElementById("saldo").innerHTML = dinero + "€";
        comprarRealizada();
        boton.disabled = true;
        boton.style.backgroundColor = "grey";
        boton.style.pointerEvents = "none";
        boton.textContent = "Comprado";
      }
    }
  }
}