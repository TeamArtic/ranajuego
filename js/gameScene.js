let appContainer, elementsContainer, pageTitle, elementsContainer2, keyboardEvent, gameFrog, gameFrog2, frogContainer, frogContainer2, mainGrid, mainGrid2, levelLoadingTimeout, frogMovementTimeout, pauseMenu, pauseMenuToggle, mainScene

let playing = false

let onMovement = false

const animationTime = 500

let actualCharacter

class levelInformation {
    constructor(levelId, name, size, floorElements){
        this.levelId = levelId
        this.name = name
        this.size = size
        this.floorElements = floorElements
    }
}

let levels = [
    new levelInformation(1, "Cloaca", new vector2(6, 6), [
        {"type":"sewerFloor","position":0},
        {"type":"sewerWater","position":1},
        {"type":"sewerFloor","position":2},
        {"type":"sewerWater","position":3},
        {"type":"sewerFloor","position":4},
        {"type":"sewerWater","position":5},
        {"type":"sewerFloor","position":6},
    ]),
    new levelInformation(2, "Carretera", new vector2(2, 6), [
        {"type":"streetFloor","position":0},
        {"type":"streetRoad","position":1},
        {"type":"streetFloor","position":2},
        {"type":"streetRoad","position":3},
        {"type":"streetFloor","position":4},
        {"type":"streetRoad","position":5},
        {"type":"streetFloor","position":6},
    ]),
    new levelInformation(3, "Autopista", new vector2(15, 3), [
        {"type":"streetFloor","position":0},
        {"type":"streetRoad","position":1},
        {"type":"streetRoad","position":2},
        {"type":"streetFloor","position":3},
    ]),
    new levelInformation(4, "Rio", new vector2(6, 6),[
        {"type":"streetFloor","position":0},
        {"type":"riverWater","position":1},
        {"type":"streetFloor","position":2},
        {"type":"riverWater","position":3},
        {"type":"streetFloor","position":4},
        {"type":"riverWater","position":5},
        {"type":"streetFloor","position":6},
    ]),
]

class levelFloor {
    constructor(floorName, imageSRC){
        this.floorName = floorName
        this.imageSRC = imageSRC
    }
}

let levelFloorObjects = [
    new levelFloor("sewerFloor", "../img/acer-nueva.png"),
    new levelFloor("sewerWater", "../img/agua.png"),
    new levelFloor("streetFloor", "../img/acer-nueva.png"),
    new levelFloor("streetRoad", "../img/carreterav1.png"),
    new levelFloor("riverWater", "../img/agua.png"),
]

let actualLevel = 0

class levelManager{
    static loadLevel(levelInfo){    // TODO Do this with classes
        actualLevel = levelInfo.levelId
        pageTitle.innerHTML = levelInfo.name
        mainGrid.setGridSize(levelInfo.size)
        elementsContainer.style.backgroundImage = "url(" + levelInfo.backgroundImage + ")"
        appContainer.style.backgroundImage = "url(" + levelInfo.backgroundImage + ")"
        gameFrog.gridTransform(new vector2(3, 0))
        for(let i = 0; i < levelInfo.floorElements.length; i++){
            let floorElement = levelInfo.floorElements[i]
            let floorObjectImageSRC = levelFloorObjects.find(function(element){
                return element.floorName == floorElement.type
            }).imageSRC
            let floorObjectText = generateLabelHTML("div",new attributes([{"name":"src","values":[floorObjectImageSRC]}, {"name":"style","values":["position:absolute;", "z-index:1;", "left:0px;", "top:" + floorElement.position * mainGrid.tileSize + "px;", "width:" + ((levelInfo.size.x + 1) * 100) + "px;", "height:100px;", "background-image:url('" + floorObjectImageSRC + "');"]}]),"")
            elementsContainer.innerHTML += floorObjectText
        }
        gameFrog.updateObjectReference()
    }
}

class road{
    constructor(YPosition){
        this.YPosition = YPosition
    }
}

class frog extends gridObject {
    constructor(objectGrid, objectScene, id) {
        super(objectGrid, objectScene, id, new vector2(3, 0), new vector2(100, 100), true);
        this.gridPosition = new vector2(3, 0); // Inicializar la propiedad gridPosition en el constructor
    }

    gridMove(offset) {
        super.gridMove(offset);
        if (this.gridPosition.y >= levels[actualLevel - 1].size.y) {
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
    if(actualLevel < levels.length){
        levelManager.loadLevel(levels[++actualLevel - 1])
        clearTimeout(levelLoadingTimeout)
        levelLoadingTimeout = setTimeout(showLevelName, 800)
    }else{
        clearTimeout(levelLoadingTimeout)
        levelLoadingTimeout = setTimeout(showEnd, 800)
    }
}

function showEnd(){
    window.location.href = "../html/creditos.html";
    levelInfoName.innerHTML = "Creditos"
    levelInfoName.style.filter = "opacity(100%)"
}

function showLevelName(){
    levelInfoName.innerHTML = levels[actualLevel - 1].name
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

function moveFrog(movement){
    if(!onMovement && playing){
        onMovement = true
        gameFrog.object.src = "../img/palante.gif"
        clearTimeout(frogMovementTimeout)
        frogMovementTimeout = setTimeout(function(){onMovement = false; gameFrog.object.src = "../img/dona.gif"}, 500)
        gameFrog.gridMove(movement)
    }
}

function keyEvent(e) {
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
        case 27:
            pauseMenuToggle.toggle()
            break;
    }
}

function update(){
    
}

window.addEventListener('load', () => {

    pageTitle = document.getElementById('pageTitle')
    foregroundContainer = document.getElementById('foregroundContainer')
    
    appContainer = document.getElementById('app')
    elementsContainer = document.getElementById('elementsContainer')
    
    gameScene = new scene(update, elementsContainer)
    keyboardEvent = new KeyboardEvent("keydown")
    mainGrid = new grid(elementsContainer, 6, 6, 100)

    // Generate the mainCharacter
    gameFrog = new frog(mainGrid, gameScene, "mainCharacter")
    gameFrog.setImage("../img/dona.gif", new vector2(50, 50), new vector2(25, -39))
    gameScene.addObject("frog", gameFrog)

    // enemyContainer = document.getElementById('enemy')
    // enemyContainer = new object("enemy", gameScene, new vector2(50,0),new vector2(0,0), enemyContainer)
    // gameScene.addObject("enemy", enemy)

    pauseMenu = document.getElementById('pauseMenu')
    pauseMenuToggle = new toggleMenu(pauseMenu, 'hidden-menu')
    document.onkeydown = keyEvent;

    levelManager.loadLevel(levels[0])
    levelLoadingTimeout = setTimeout(showLevelName, 800)

});