var dinero = 100;
var Tortugas = [
    { nombre: 'Splinter', precio: '5' },
    { nombre: 'Leonardo', precio: '10' },
    { nombre: 'Raphael', precio: '20' },
    { nombre: 'Michelangelo', precio: '30' },
    { nombre: 'Donatelo', precio: '40' },
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
  var personaje = event.target.id;
  var boton = document.getElementById(personaje);
  for (var i = 0; i < Tortugas.length; i++) {
    if (personaje == Tortugas[i].nombre && dinero - Tortugas[i].precio >= 0) {
      if (personaje == Tortugas[i].nombre) {
        dinero -= Tortugas[i].precio;
        document.getElementById('saldo').innerHTML = dinero + '€';
        boton.disabled = true;
        comprarRealizada();
      }
    }
  }
}
