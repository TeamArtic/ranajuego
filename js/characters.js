function setCharacter(newCharacter){
    localStorage.setItem("selectedCharacterId", newCharacter)
}
function setCharacter(characterIndex) {
    // ... código que selecciona un personaje ...
  
    // muestra el botón de cancelar
    const cancelButton = document.getElementById('cancelar');
    cancelButton.classList.remove('hidden');
  }
  function setCharacter(characterIndex) {
    var buttons = document.getElementsByClassName("highlighted-button");
    var selectedButton = buttons[characterIndex];
  
    // Cambiar el texto y estado del botón seleccionado
    selectedButton.innerHTML = "Seleccionado";
    selectedButton.disabled = true;
    selectedButton.style.backgroundColor = "gray";
    selectedButton.style.transform = "none";
    selectedButton.style.color = "black";
    selectedButton.style.textShadow = "none";
    selectedButton.style.boxShadow = "none";
  }