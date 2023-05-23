window.addEventListener("load", function () {

    var rana = document.getElementById("rana");
    var rana1 = "../img/dona.gif"; // ruta del gif de posición "parado"
    var rana2 = "../img/saltar.gif"; // ruta del gif de posición "salto"
    var isJumping = false;

    rana.addEventListener("click", function () {
        if (!isJumping) { // si la rana no está saltando actualmente
            isJumping = true; // marcar como saltando
            rana.src = rana2; // cambiar la imagen a la de salto
            rana.classList.add("jump"); // agregar la clase "jump" para iniciar la animación de salto
            setTimeout(function () { // después de 1000 milisegundos
                rana.classList.remove("jump"); // eliminar la clase "jump" para detener la animación de salto
                rana.src = rana1; // cambiar la imagen de vuelta a la de posición "parado"
                isJumping = false; // marcar como no saltando
            }, 1000);
        }
    });

});
