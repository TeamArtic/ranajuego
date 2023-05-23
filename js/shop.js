var dinero = 100;
let money, moneyContainer, unlockedCharacters

let characterPrices = [
  {"characterId":0, "price":5},
  {"characterId":1, "price":5},
  {"characterId":2, "price":5},
  {"characterId":4, "price":5},
]

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

function buyCharacter(characterId){
  let characterInfo = characterPrices.find((element) => {
    return characterId == element.characterId
  })
  if(characterInfo){
    if(!unlockedCharacters[characterId].unlocked){
      if(characterInfo.price <= money){
        money -= characterInfo.price
        localStorage.setItem('money', money)
        moneyContainer.innerHTML = money + "€"
        unlockedCharacters[characterId].unlocked = true
        localStorage.setItem('unlockedCharacters', JSON.stringify(unlockedCharacters))
      }else{
      alert("No tienes suficiente dinero para comprar a este personaje.")
      }
    }else{
      alert('Ya tienes a este personaje.')
    }
  }
}

window.addEventListener('load', () => {
  money = localStorage.getItem('money')
  if(!money){
    money = 0
  }else{
    money = parseInt(money)
  }
  moneyContainer = document.getElementById('saldo')
  moneyContainer.innerHTML = money + "€"
  unlockedCharacters = JSON.parse(localStorage.getItem('unlockedCharacters'))
  if(!unlockedCharacters){
    unlockedCharacters = [
      {"characterId":0, "unlocked":false},
      {"characterId":1, "unlocked":false},
      {"characterId":2, "unlocked":false},
      {"characterId":3, "unlocked":true},
      {"characterId":4, "unlocked":false}
    ]
  }
})

function removeAllCharacters(){
  unlockedCharacters = [
    {"characterId":0, "unlocked":false},
    {"characterId":1, "unlocked":false},
    {"characterId":2, "unlocked":false},
    {"characterId":3, "unlocked":true},
    {"characterId":4, "unlocked":false}
  ]
  localStorage.setItem('unlockedCharacters', JSON.stringify(unlockedCharacters))
}