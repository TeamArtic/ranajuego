let appContainer, elementsContainer, pageTitle, elementsContainer2, keyboardEvent, gameFrog, gameFrog2, frogContainer, frogContainer2, mainGrid, mainGrid2, levelLoadingTimeout, frogMovementTimeout, pauseMenu, pauseMenuToggle, mainScene

let playing = false

let notPaused = true

let onMovement = false

const animationTime = 500

let actualCharacter

let roads = []

let superDead = false

const superDeadTimeout = 1000

let superDeadTimeoutTime = superDeadTimeout

let lifes = 3

function removeFromAnArray(array, startPosition, endPosition = null){
    if(!endPosition){
        endPosition = startPosition + 1
    }
    return array.splice(0, startPosition).concat(array.splice(startPosition + endPosition, array.length)) /* This part of the code is pending of reviewing. */
}

class levelInformation {
    constructor(levelId, name, size, spawPosition, floorElements, roadsElements) {
        this.levelId = levelId
        this.name = name
        this.size = size
        this.spawPosition = spawPosition
        this.floorElements = floorElements
        this.roadsElements = roadsElements
    }
}

let levels = [
    new levelInformation(1, "Cloaca", new vector2(6, 6), new vector2(3, 0), [
        {"type":"sewerStart","position":-1},
        {"type":"sewerFloor","position":0},
        {"type":"sewerWater","position":1},
        {"type":"sewerFloor","position":2},
        {"type":"sewerWater","position":3},
        {"type":"sewerFloor","position":4},
        {"type":"sewerWater","position":5},
        {"type":"sewerFloor","position":6},
    ], [
        { "yPosition": 1, "speed": 30 , "direction": "r"},
        { "yPosition": 3, "speed": 25 , "direction": "l"},
        { "yPosition": 5, "speed": 20 , "direction": "r"},
    ]),
    new levelInformation(2, "Ciudad día", new vector2(6, 6), new vector2(3, 0), [
        {"type":"startDia","position":-1},
        {"type":"streetFloor","position":0},
        {"type":"streetRoad","position":1},
        {"type":"streetFloor","position":2},
        {"type":"streetRoad","position":3},
        {"type":"streetFloor","position":4},
        {"type":"streetRoad","position":5},
        {"type":"streetFloor","position":6},
    ], [
        { "yPosition": 1, "speed": 20 , "direction": "l"},
        { "yPosition": 3, "speed": 40 , "direction": "l"},
        { "yPosition": 5, "speed": 30 , "direction": "l"},
    ]),
    new levelInformation(3, "Ciudad tarde", new vector2(6, 6), new vector2(3, 0), [
        {"type":"startTarde","position":-1},
        {"type":"streetUnMillonPM","position":0},
        {"type":"roadUnMillonPM","position":1},
        {"type":"roadUnMillonPM","position":2},
        {"type":"streetUnMillonPM","position":3},
        {"type":"roadUnMillonPM","position":4},
        {"type":"roadUnMillonPM","position":5},
        {"type":"streetUnMillonPM","position":6},
    ], [
        { "yPosition": 1, "speed": 15 , "direction": "l"},
        { "yPosition": 2, "speed": 30 , "direction": "l"},
        { "yPosition": 4, "speed": 35 , "direction": "l"},
        { "yPosition": 5, "speed": 25 , "direction": "l"},
    ]),
    new levelInformation(4, "Ciudad noche", new vector2(6, 6), new vector2(3, 0), [
        { "type": "startNoche", "position": -1 },
        { "type": "streetLaCeroPuntoCincoMillonesPM", "position": 0 },
        { "type": "roadLaCeroPuntoCincoMillonesPM", "position": 1 },
        { "type": "streetLaCeroPuntoCincoMillonesPM", "position": 2 },
        { "type": "roadLaCeroPuntoCincoMillonesPM", "position": 3 },
        { "type": "streetLaCeroPuntoCincoMillonesPM", "position": 4 },
        { "type": "roadLaCeroPuntoCincoMillonesPM", "position": 5 },
        { "type": "streetLaCeroPuntoCincoMillonesPM", "position": 6 },
    ], [
        { "yPosition": 1, "speed": 30 , "direction": "l"},
        { "yPosition": 3, "speed": 70 , "direction": "l"},
        { "yPosition": 5, "speed": 45 , "direction": "l"},
    ]),
    new levelInformation(5, "Playa", new vector2(6, 6), new vector2(3,0), [
        {"type":"startPlaya","position":-1},
        {"type":"sandFloor","position":0},
        {"type":"sandWater","position":1},
        {"type":"sandFloor","position":2},
        {"type":"sandWater","position":3},
        {"type":"sandFloor","position":4},
        {"type":"sandWater","position":5},
        {"type":"sandFloor","position":6},
    ], [
        { "yPosition": 1, "speed": 45 , "direction": "l"},
        { "yPosition": 3, "speed": 30 , "direction": "l"},
        { "yPosition": 5, "speed": 70 , "direction": "l"},
    ]),
    new levelInformation(6, "Autopista", new vector2(6, 6), new vector2(3,0), [
        {"type":"streetFloor","position":0},
        {"type":"streetRoad","position":1},
        {"type":"streetRoad","position":2},
        {"type":"streetFloor","position":3},
        {"type":"streetRoad","position":4},
        {"type":"streetRoad","position":5},
        {"type":"streetFloor","position":6},
    ], [
        { "yPosition": 1, "speed": 80 , "direction": "l"},
        { "yPosition": 2, "speed": 80 , "direction": "l"},
        { "yPosition": 4, "speed": 80 , "direction": "l"},
        { "yPosition": 5, "speed": 80 , "direction": "l"},
    ]),
    new levelInformation(7, "Ciudad Futur", new vector2(6, 6), new vector2(3,0), [
        {"type":"futureStart","position":-1},
        {"type":"futureStreet","position":0},
        {"type":"futureRoad","position":1},
        {"type":"futureRoad","position":2},
        {"type":"futureRoad","position":3},
        {"type":"futureRoad","position":4},
        {"type":"futureRoad","position":5},
        {"type":"futureStreet","position":6},
    ], [
        { "yPosition": 1, "speed": 80 , "direction": "l"},
        { "yPosition": 2, "speed": 100 , "direction": "l"},
        { "yPosition": 3, "speed": 40 , "direction": "l"},
        { "yPosition": 4, "speed": 60 , "direction": "l"},
        { "yPosition": 5, "speed": 30 , "direction": "l"},
    ]),
]

class levelFloor {
    constructor(floorName, imageSRC) {
        this.floorName = floorName
        this.imageSRC = imageSRC
    }
}

let levelFloorObjects = [
    new levelFloor("sewerStart", "../img/cloaca-nueva.png"),
    new levelFloor("sewerFloor", "../img/suelo.png"),
    new levelFloor("sewerWater", "../img/agua.png"),
    new levelFloor("futureStart", "../img/cabecero-city.png"),
    new levelFloor("futureStreet", "../img/acerfutur.png"),
    new levelFloor("futureRoad", "../img/carreterafutur.png"),
    new levelFloor("streetFloor", "../img/acer-nueva.png"),
    new levelFloor("streetRoad", "../img/carreterav1.png"),
    new levelFloor("riverWater", "../img/agua.png"),
    new levelFloor("sandFloor", "../img/arena.png"),
    new levelFloor("sandWater", "../img/agua2.png"),
    new levelFloor("streetUnMillonPM", "../img/acer-atarde.png"),
    new levelFloor("roadUnMillonPM", "../img/carretera-atarde.png"),
    new levelFloor("streetLaCeroPuntoCincoMillonesPM", "../img/acer-noche.png"),
    new levelFloor("roadLaCeroPuntoCincoMillonesPM", "../img/carretera-noche.png"),
    new levelFloor("startDia", "../img/cabecero-calle.png"),
    new levelFloor("startTarde", "../img/cabecero-calleatarde.png"),
    new levelFloor("startNoche", "../img/cabecero-callenoche.png"),
    new levelFloor("startPlaya", "../img/cabecero-playa2.png"),
]

let actualLevel = 0

class levelManager {
    static loadLevel(levelInfo) {    // TODO Do this with classes
        for(let i = 0; i < roads.length; i++){
            roads[i].remove()
            delete roads[i]
        }
        roads = []
        let floorElements = document.getElementsByClassName("floorElement")
        let length = floorElements.length
        for(let i = 0; i < length; i++){
            floorElements[0].remove()
        }
        actualLevel = levelInfo.levelId
        pageTitle.innerHTML = levelInfo.name
        mainGrid.setGridSize(levelInfo.size)
        elementsContainer.style.backgroundImage = "url(" + levelInfo.backgroundImage + ")"
        appContainer.style.backgroundImage = "url(" + levelInfo.backgroundImage + ")"
        gameFrog.gridTransform(levelInfo.spawPosition)
        for (let i = 0; i < levelInfo.floorElements.length; i++) {
            let floorElement = levelInfo.floorElements[i]
            let floorObjectImageSRC = levelFloorObjects.find(function (element) {
                return element.floorName == floorElement.type
            }).imageSRC
            let floorObjectText = generateLabelHTML("div", new attributes([{ "name": "src", "values": [floorObjectImageSRC] }, {"name":"class", "values":["floorElement"]}, { "name": "style", "values": ["position:absolute;", "z-index:1;", "left:0px;", "top:" + floorElement.position * mainGrid.tileSize + "px;", "width:" + ((levelInfo.size.x + 1) * 100) + "px;", "height:100px;", "background-image:url('" + floorObjectImageSRC + "');"] }]), "")
            elementsContainer.innerHTML += floorObjectText
        }
        for (let i = 0; i < levelInfo.roadsElements.length; i++) {
            roads.push(new road(gameScene, levelInfo.roadsElements[i].yPosition, levelInfo.roadsElements[i].speed, "road-" + i, levelInfo.roadsElements[i].direction))
        }
        for(let i = 0; i < roads.length; i++){
            roads[i].updateEnemiesReferences()
        }
        gameFrog.updateObjectReference()
    }
}

class enemy extends object {
    constructor(objectScene, position, speed, direction, enemyId) {
        super(enemyId, objectScene, position, new vector2(100, 100), true)
        this.enemyId = enemyId
        this.speed = speed
        this.setPosition(position)
        this.position = position
        this.object.style.zIndex = 2
        this.direction = direction
        this.object.src = "../img/armaggon.gif"
        this.setImage("../img/armaggon.gif", new vector2(50, 50), new vector2(10, -30))
        if(this.direction == "r"){
            this.object.style.transform = "scale(-1,1)"
        }
        this.move(new vector2(0,0))
    }

    // moveEnemy(){
    //     this.object.move(new vector2(speed, 0))
    // }

    update(){
        this.move(new vector2(this.speed/5, 0))
        if(!this.isColliding(gameFrog)){
            lifes -= 1
            superDead = true
            foregroundContainer.style.backdropFilter = "grayScale(1)"
            if(lifes <= 0){
                window.location.reload() // TODO Make the death animation
            }
        }
    }
}

class road {
    constructor(objectScene, YPosition, speed, roadId, direction = "l") {
        this.YPosition = YPosition * 100
        this.speed = speed
        this.objectScene = objectScene
        this.roadId = roadId
        this.numberOfEnemies = 0
        this.direction = direction
        this.disabledEnemies = []
        this.enemies = [this.generateEnemy()]
        this.nextEnemyGeneration = 0
    }

    generateEnemy() {
        let horizontalPosition
        let enemySpeed
        if(this.direction == "l"){
            horizontalPosition = -100
            enemySpeed = this.speed
        }else{
            horizontalPosition = (levels[actualLevel - 1].size.x + 1) * 100
            enemySpeed = -this.speed
        }
        let generationPosition = new vector2(horizontalPosition, this.YPosition)
        if(this.disabledEnemies.length > 0){
            let finalEnemy = this.disabledEnemies[0]
            this.disabledEnemies = removeFromAnArray(this.disabledEnemies, 0)
            // finalEnemy.position = generationPositions
            // finalEnemy.object.position = generationPosition
            finalEnemy.setPosition(generationPosition)
            finalEnemy.speed = enemySpeed
            finalEnemy.object.style.display = "unset"
            return finalEnemy
        }else{
            return new enemy(this.objectScene, generationPosition, enemySpeed,  this.direction, this.roadId + "-" + ++this.numberOfEnemies)
        }
    }

    remove(){
        for(let i = 0; i < this.enemies.length; i++){
            this.enemies[i].remove()
            delete this.enemies[i]
        }
        for(let i = 0; i < this.disabledEnemies.length; i++){
            this.disabledEnemies[i].remove()
            delete this.disabledEnemies[i]
        }
    }

    updateEnemiesReferences(){
        for(let i = 0; i < this.enemies.length; i++){
            this.enemies[i].updateObjectReference()
        }
    }

    disableEnemy(enemyId){
        this.enemies[enemyId].object.style.display = "none"
        this.disabledEnemies.push(this.enemies[enemyId])
        this.enemies = removeFromAnArray(this.enemies, enemyId)
    }

    update(){
        for(let i = 0; i < this.enemies.length; i++){
            this.enemies[i].update()
            if(this.direction == "l"){
                if(this.enemies[i].position.x > 700){
                    this.disableEnemy(i)
                }
            }else{
                if(this.enemies[i].position.x < -100){
                    this.disableEnemy(i)
                }
            }
        }
        this.nextEnemyGeneration += 1
        if(this.nextEnemyGeneration >= 2000/25){
            this.nextEnemyGeneration = 0
            this.enemies.push(this.generateEnemy())
            for(let i = 0; i < roads.length; i++){
                roads[i].updateEnemiesReferences()
            }
            gameFrog.updateObjectReference()
        }
    }
}

class frog extends gridObject {
    constructor(objectGrid, objectScene, id, colliderObject, colliderSize) {
        super(objectGrid, objectScene, id, new vector2(3, 0), new vector2(100, 100), true, colliderObject, colliderSize);
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

class imageInfo {
    constructor(imageURL, size, center) {
        this.imageURL = imageURL
    }
}

class characterInfo {
    constructor(characterName, stayImageURL, movingImageURL, characterLifes, characterSuperLifes, speed) {
        this.characterName = characterName
        this.stayImageURL = stayImageURL
        this.movingImageURL = movingImageURL
        this.characterLifes = characterLifes
        this.characterSuperLifes = characterSuperLifes
        this.speed = speed
    }
}

let imagesFolder = "../img/"

let characters = [
    new characterInfo("Jennica", imagesFolder + "yellow.gif", imagesFolder + "yellowfow.gif", 6, 0, 10),
    new characterInfo("Leo", imagesFolder + "leo.gif", imagesFolder + "leopalante nuevo.gif", 4, 0, 20),
    new characterInfo("Rafael", imagesFolder + "rafa.gif", imagesFolder + "rafapalante.gif", 2, 0, 30),
    new characterInfo("Michelangelo", imagesFolder + "miguel.gif", imagesFolder + "miguelpalante.gif", 3, 0, 25),
    new characterInfo("Donnatelo", imagesFolder + "dona.gif", imagesFolder + "palante.gif", 3, 0, 25)
]

let selectedCharacterId = localStorage.getItem("selectedCharacterId")
if(!selectedCharacterId){
    selectedCharacterId = 0
}
actualCharacter = characters[selectedCharacterId]

// Level transition animation

function startLoadingLevel() {
    playing = false
    foregroundContainer.style.backgroundColor = "#000000FF"
    // foregroundContainer.style.filter = "blur(4px)"
    clearTimeout(levelLoadingTimeout)
    levelLoadingTimeout = setTimeout(loadLevel, animationTime)
}

function loadLevel() {
    if (actualLevel < levels.length) {
        levelManager.loadLevel(levels[++actualLevel - 1])
        clearTimeout(levelLoadingTimeout)
        levelLoadingTimeout = setTimeout(showLevelName, 800)
    } else {
        clearTimeout(levelLoadingTimeout)
        levelLoadingTimeout = setTimeout(showEnd, 800)
    }
}

function showEnd() {
    window.location.href = "../html/credits.html";
    levelInfoName.innerHTML = "Creditos"
    levelInfoName.style.filter = "opacity(100%)"
}

function showLevelName() {
    levelInfoName.innerHTML = levels[actualLevel - 1].name
    levelInfoName.style.filter = "opacity(100%)"
    clearTimeout(levelLoadingTimeout)
    levelLoadingTimeout = setTimeout(showLevel, 1000)
}

function showLevel() {
    clearTimeout(levelLoadingTimeout)
    levelLoadingTimeout = setTimeout(showLevelInfo, animationTime)
    foregroundContainer.style.backgroundColor = "#000000ab"
}

function showLevelInfo() { // TODO Change the name of this function.
    // pageTitle.innerHTML = levels[actualLevel].name
    clearTimeout(levelLoadingTimeout)
    levelLoadingTimeout = setTimeout(removeLoadLevelEffects, 1000)
}

function removeLoadLevelEffects() {
    foregroundContainer.style.backgroundColor = "#00000000"
    clearTimeout(levelLoadingTimeout)
    levelLoadingTimeout = setTimeout(startLevel, animationTime)
    levelInfoName.style.filter = "opacity(0%)"
}

function startLevel() {
    playing = true
}

// End of the level transition animation

function transitionToNextScreen() {
    //transición a la siguiente pantalla
    mainGrid.setGrid(document.getElementById('elementsContainer2'))
    gameFrog.setObject(document.getElementById('rana2'))
    document.getElementById('elementsContainer').style.display = 'none';
    document.getElementById('elementsContainer2').style.display = 'grid';
}

function moveFrog(movement) {
    if (!onMovement && playing && notPaused) {
        onMovement = true
        if(actualCharacter){
            gameFrog.object.src = actualCharacter.movingImageURL
        }
        clearTimeout(frogMovementTimeout)
        frogMovementTimeout = setTimeout(function () { onMovement = false; if(actualCharacter){gameFrog.object.src = actualCharacter.stayImageURL}}, 500)
        gameFrog.gridMove(movement)
    }
}

function specialAbility(){
    
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
        case 32:
            specialAbility()
            break;
        case 27:
            pauseMenuToggle.toggle()
            notPaused = pauseMenuToggle.enabled
            break;
    }
}

function update() {
    if(playing && notPaused){
        if(superDead){
            superDeadTimeoutTime -= 10
            if(superDeadTimeoutTime <= 0){
                superDead = false
                superDeadTimeoutTime = superDeadTimeout
                foregroundContainer.style.backdropFilter = ""
            }
        }else{
            for(let i = 0; i < roads.length; i++){
                roads[i].update()
            }
        }
    }
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
    gameFrog = new frog(mainGrid, gameScene, "mainCharacter", new vector2(30, 30), new vector2(40, 40))
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