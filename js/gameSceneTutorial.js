let appContainer, elementsContainer, pageTitle, elementsContainer2, keyboardEvent, gameFrog, gameFrog2, frogContainer, frogContainer2, mainGrid, mainGrid2, levelLoadingTimeout, frogMovementTimeout

let playing = false

let onMovement = false

const animationTime = 500

let actualCharacter

class level {
    constructor(levelId, name, backgroundImage){
        this.levelId = levelId
        this.name = name
        this.backgroundImage = backgroundImage
    }
}

// let levels = [
//     {"level":1, "name":"Cloaca", "backgroundImage":"../img/grafico-cloaca.png"},
//     {"level":2, "name":"Carretera", "backgroundImage":"../img/grafico-carretera.png"},
//     {"level":3, "name":"Level name", "backgroundImage":"../img/grafico3.png"}
// ]

let levels = [
    new level(1, "Tutorial", "../img/prueba-carretera.png"),
]

let actualLevel = 0

class levelManager{
    static loadLevel(level){    // TODO Do this with classes
        pageTitle.innerHTML = level.name
        elementsContainer.style.backgroundImage = "url(" + level.backgroundImage + ")"
        appContainer.style.backgroundImage = "url(" + level.backgroundImage + ")"
        gameFrog.gridTransform(new vector2(3, 0))
    }
}

class frog extends gridObject {
    constructor(objectGrid, objectScene, id, object) {
        super(objectGrid, objectScene, id, new vector2(3, 0), new vector2(100, 100), object);
        this.gridPosition = new vector2(3, 0); // Inicializar la propiedad gridPosition en el constructor
    }

    gridMove(offset) {
        super.gridMove(offset);
        if (this.gridPosition.y === 6) {
            // Si la rana llegó a la fila 6, activa la transición a la siguiente pantalla
            startLoadingLevel()
        }
    }
}

class imageInfo{
    constructor(imageURL, size, center){
        this.imageURL = imageURL
    }
}

class characterInfo{
    constructor(characterName, stayImageURL, movingImageURL){
        this.characterName = characterName
        this.stayImageURL = stayImageURL
        this.movingImageURL = movingImageURL
    }
}

let imagesFolder = "../img/"

let characters = [
    new characterInfo("Donatelo", imagesFolder + "dona.gif", imagesFolder + "palante.gif")
]

// Level transition animation

function startLoadingLevel(){
    playing = false
    foregroundContainer.style.backgroundColor = "#000000FF"
    // foregroundContainer.style.filter = "blur(4px)"
    clearTimeout(levelLoadingTimeout)
    levelLoadingTimeout = setTimeout(loadLevel, animationTime)
}

function loadLevel(){
    if(actualLevel < levels.length - 1){
        levelManager.loadLevel(levels[++actualLevel])
        clearTimeout(levelLoadingTimeout)
        levelLoadingTimeout = setTimeout(showLevelName, 800)
    }else{
        clearTimeout(levelLoadingTimeout)
        levelLoadingTimeout = setTimeout(showEnd, 800)
    }
}

function showEnd(){
    window.location.href = "../html/mainmenu.html";
    levelInfoName.innerHTML = "Menu Principal"
    levelInfoName.style.filter = "opacity(100%)"
}

function showLevelName(){
    levelInfoName.innerHTML = levels[actualLevel].name
    levelInfoName.style.filter = "opacity(100%)"
    clearTimeout(levelLoadingTimeout)
    levelLoadingTimeout = setTimeout(showLevel, 1000)
}

function showLevel(){
    clearTimeout(levelLoadingTimeout)
    levelLoadingTimeout = setTimeout(showLevelInfo, animationTime)
    foregroundContainer.style.backgroundColor = "#000000ab"
}

function showLevelInfo(){ // TODO Change the name of this function.
    // pageTitle.innerHTML = levels[actualLevel].name
    clearTimeout(levelLoadingTimeout)
    levelLoadingTimeout = setTimeout(removeLoadLevelEffects, 1000)
}

function removeLoadLevelEffects(){
    foregroundContainer.style.backgroundColor = "#00000000"
    clearTimeout(levelLoadingTimeout)
    levelLoadingTimeout = setTimeout(startLevel, animationTime)
    levelInfoName.style.filter = "opacity(0%)"
}

function startLevel(){
    playing = true
}

// End of the level transition animation

function transitionToNextScreen() {
    //transición a la siguiente pantalla
    gameFrog.gridTransform(new vector2(3, 0));
    mainGrid.setGrid(document.getElementById('elementsContainer2'))
    gameFrog.setObject(document.getElementById('rana2'))
    document.getElementById('elementsContainer').style.display = 'none';
    document.getElementById('elementsContainer2').style.display = 'grid';
}

function ranasalta() {
    var isJumping = false;
    var rana = document.getElementById("rana");
    var rana1 = "../img/dona.gif"; // ruta del gif de posición "parado"
    var rana2 = "../img/saltar.gif"; // ruta del gif de posición "salto"
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
};

function moveFrog(movement){
    if(!onMovement && playing){
        onMovement = true
        rana.src = "../img/palante.gif"
        clearTimeout(frogMovementTimeout)
        frogMovementTimeout = setTimeout(function(){onMovement = false; rana.src = "../img/dona.gif"}, 500)
        gameFrog.gridMove(movement)
    }
}

function moveCharacter(e) {
    switch (e.keyCode) {
        case 87:
            moveFrog(new vector2(0, -1))
            break;
        case 65:
            moveFrog(new vector2(-1, 0))
            break;
        case 83:
            moveFrog(new vector2(0, 1))
            break;
        case 68:
            moveFrog(new vector2(1, 0))
            break;
    }
}

window.addEventListener('load', () => {
    appContainer = document.getElementById('app')
    pageTitle = document.getElementById('pageTitle')
    elementsContainer = document.getElementById('elementsContainer')
    foregroundContainer = document.getElementById('foregroundContainer')
    mainScene = new scene()
    keyboardEvent = new KeyboardEvent("keydown")
    frogContainer = document.getElementById('rana')
    mainGrid = new grid(elementsContainer, 6, 6, 100)
    gameFrog = new frog(mainGrid, mainScene, "mainFrog", frogContainer)
    gameFrog.setImage("../img/dona.gif", new vector2(50, 50), new vector2(25, -39))
    document.onkeydown = moveCharacter;
    levelManager.loadLevel(levels[0])
    levelLoadingTimeout = setTimeout(showLevelName, 800)
});
