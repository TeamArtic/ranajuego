let appContainer, elementsContainer, pageTitle, elementsContainer2, keyboardEvent, gameFrog, gameFrog2, frogContainer, frogContainer2, mainGrid, mainGrid2, levelLoadingTimeout, frogMovementTimeout, pauseMenu, pauseMenuToggle, mainScene, continueButton, 
character, level, lifesContainer, specialAvilityContainer

let imagesFolder = "../img/"

let playing = false

let notPaused = true

let onMovement = false

const animationTime = 500

let actualCharacter

let roads = []

let superDead = false

const superDeadTimeout = 500

let superDeadTimeoutTime = superDeadTimeout

let lifes = 3

let superLifes = 0

let movementTimeout = 500

function removeFromAnArray(array, startPosition, endPosition = null){
    if(!endPosition){
        endPosition = startPosition + 1
    }
    let endArray = array.splice(endPosition, array.length)
    let startArray = array.splice(0, startPosition)
    return startArray.concat(endArray)
}

class imageInfo {
    constructor(imageURL, size, center) {
        this.imageURL = imageURL
        this.size = size
        this.center = center
    }
}

class enemyInfo{
    constructor(name, image){
        this.name = name
        this.image = image
    }
}

let enemiesInfo = [
    {"name":"armaggon", "image":new imageInfo(imagesFolder + "armaggon.gif", new vector2(50, 50), new vector2(10, -30))},
    {"name":"april", "image":new imageInfo(imagesFolder + "april.gif", new vector2(20, 20), new vector2(29, -25))}, // 41x75
    {"name":"asuka", "image":new imageInfo(imagesFolder + "asuka.gif", new vector2(23, 23), new vector2(27, -43))}, // 46x93
    {"name":"chrome", "image":new imageInfo(imagesFolder + "chrome.gif", new vector2(26, 26), new vector2(23, -36))}, //53x76  23 -26
    {"name":"cyber", "image":new imageInfo(imagesFolder + "cyber.gif", new vector2(25, 25), new vector2(25, -49))}, // 50x99
    {"name":"dirtbag", "image":new imageInfo(imagesFolder + "dirtbag.gif", new vector2(20, 20), new vector2(25, -12))}, // 40x62
    // {"name":"karai", "image":new imageInfo(imagesFolder + "karai.gif", new vector2(48, 48), new vector2(1, -54))}, // 97x104
    {"name":"wignut", "image":new imageInfo(imagesFolder + "wignut.gif", new vector2(21, 21), new vector2(21, -45))} // 57x85 21 -35
]

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
        { "yPosition": 1, "speed": 30 , "direction": "r", "enemy":"armaggon"},
        { "yPosition": 3, "speed": 25 , "direction": "l", "enemy":"armaggon"},
        { "yPosition": 5, "speed": 20 , "direction": "r", "enemy":"armaggon"},
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
        { "yPosition": 1, "speed": 20 , "direction": "l", "enemy":"april"},
        { "yPosition": 3, "speed": 40 , "direction": "l", "enemy":"april"},
        { "yPosition": 5, "speed": 30 , "direction": "l", "enemy":"april"},
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
        { "yPosition": 1, "speed": 15 , "direction": "l", "enemy":"april"},
        { "yPosition": 2, "speed": 30 , "direction": "l", "enemy":"april"},
        { "yPosition": 4, "speed": 35 , "direction": "l", "enemy":"april"},
        { "yPosition": 5, "speed": 25 , "direction": "l", "enemy":"april"},
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
        { "yPosition": 1, "speed": 30 , "direction": "l", "enemy":"april"},
        { "yPosition": 3, "speed": 70 , "direction": "l", "enemy":"april"},
        { "yPosition": 5, "speed": 45 , "direction": "l", "enemy":"april"},
    ]),
    new levelInformation(5, "Ciudad noche", new vector2(2, 6), new vector2(1, 0), [
        { "type": "startNoche", "position": -1 },
        { "type": "streetLaCeroPuntoCincoMillonesPM", "position": 0 },
        { "type": "roadLaCeroPuntoCincoMillonesPM", "position": 1 },
        { "type": "streetLaCeroPuntoCincoMillonesPM", "position": 2 },
        { "type": "roadLaCeroPuntoCincoMillonesPM", "position": 3 },
        { "type": "roadLaCeroPuntoCincoMillonesPM", "position": 4 },
        { "type": "roadLaCeroPuntoCincoMillonesPM", "position": 5 },
        { "type": "streetLaCeroPuntoCincoMillonesPM", "position": 6 },
    ], [
        { "yPosition": 1, "speed": 30 , "direction": "l", "enemy":"april"},
        { "yPosition": 3, "speed": 40 , "direction": "r", "enemy":"april"},
        { "yPosition": 4, "speed": 55 , "direction": "l", "enemy":"april"},
        { "yPosition": 5, "speed": 65 , "direction": "r", "enemy":"april"},
    ]),
    new levelInformation(6, "Playa", new vector2(6, 6), new vector2(3,0), [
        {"type":"startPlaya","position":-1},
        {"type":"sandFloor","position":0},
        {"type":"sandWater","position":1},
        {"type":"sandFloor","position":2},
        {"type":"sandWater","position":3},
        {"type":"sandFloor","position":4},
        {"type":"sandWater","position":5},
        {"type":"sandFloor","position":6},
    ], [
        { "yPosition": 1, "speed": 45 , "direction": "l", "enemy":"armaggon"},
        { "yPosition": 3, "speed": 30 , "direction": "l", "enemy":"wignut"},
        { "yPosition": 5, "speed": 70 , "direction": "l", "enemy":"wignut"},
    ]),
    new levelInformation(7, "Autopista", new vector2(6, 6), new vector2(3,0), [
        {"type":"streetFloor","position":0},
        {"type":"streetRoad","position":1},
        {"type":"streetRoad","position":2},
        {"type":"streetFloor","position":3},
        {"type":"streetRoad","position":4},
        {"type":"streetRoad","position":5},
        {"type":"streetFloor","position":6},
    ], [
        { "yPosition": 1, "speed": 80 , "direction": "l", "enemy":"wignut"},
        { "yPosition": 2, "speed": 80 , "direction": "l", "enemy":"wignut"},
        { "yPosition": 4, "speed": 80 , "direction": "l", "enemy":"wignut"},
        { "yPosition": 5, "speed": 80 , "direction": "l", "enemy":"wignut"},
    ]),
    new levelInformation(8, "Ciudad futurista 1", new vector2(4, 6), new vector2(2,0), [
        {"type":"futureStart","position":-1},
        {"type":"futureStreet","position":0},
        {"type":"futureRoad","position":1},
        {"type":"futureRoad","position":2},
        {"type":"futureRoad","position":3},
        {"type":"futureRoad","position":4},
        {"type":"futureRoad","position":5},
        {"type":"futureStreet","position":6},
    ], [
        { "yPosition": 1, "speed": 30 , "direction": "l", "enemy":"chrome"},
        { "yPosition": 2, "speed": 50 , "direction": "r", "enemy":"wignut"},
        { "yPosition": 3, "speed": 30 , "direction": "l", "enemy":"chrome"},
        { "yPosition": 4, "speed": 70 , "direction": "r", "enemy":"wignut"},
        { "yPosition": 5, "speed": 30 , "direction": "l", "enemy":"chrome"},
    ]),
    new levelInformation(9, "Ciudad futurista 2", new vector2(6, 6), new vector2(3,0), [
        {"type":"futureStart","position":-1},
        {"type":"futureStreet","position":0},
        {"type":"futureRoad","position":1},
        {"type":"futureRoad","position":2},
        {"type":"futureRoad","position":3},
        {"type":"futureRoad","position":4},
        {"type":"futureRoad","position":5},
        {"type":"futureStreet","position":6},
    ], [
        { "yPosition": 1, "speed": 80 , "direction": "l", "enemy":"dirtbag"},
        { "yPosition": 2, "speed": 100 , "direction": "l", "enemy":"dirtbag"},
        { "yPosition": 3, "speed": 40 , "direction": "l", "enemy":"wignut"},
        { "yPosition": 4, "speed": 60 , "direction": "l", "enemy":"chrome"},
        { "yPosition": 5, "speed": 30 , "direction": "l", "enemy":"april"},
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
        let leftGradientElement = document.getElementById('leftGradientElement')
        let rightGradientElement = document.getElementById('rightGradientElement')
        // leftGradientElement.style.left = "-200px"
        // leftGradientElement.style.top = "-100px"
        // leftGradientElement.style.width = "200px"
        // leftGradientElement.style.height = ((levelInfo.size.y + 1)) * 100 + "px"
        leftGradientElement.style = "left:-200px;top:-100px;height:" + ((levelInfo.size.y + 2)) * 100 + "px;width:200px;"
        rightGradientElement.style = "right:-200px;top:-100px;height:" + ((levelInfo.size.y + 2)) * 100 + "px;width:200px;"
        elementsContainer.style.backgroundImage = "url(" + levelInfo.backgroundImage + ")"
        appContainer.style.backgroundImage = "url(" + levelInfo.backgroundImage + ")"
        gameFrog.gridTransform(levelInfo.spawPosition)
        for (let i = 0; i < levelInfo.floorElements.length; i++) {
            let floorElement = levelInfo.floorElements[i]
            let floorObjectImageSRC = levelFloorObjects.find(function (element) {
                return element.floorName == floorElement.type
            }).imageSRC
            let floorObjectText = generateLabelHTML("div", new attributes([{ "name": "src", "values": [floorObjectImageSRC] }, {"name":"class", "values":["floorElement"]}, { "name": "style", "values": ["position:absolute;", "z-index:1;", "left:-100px;", "top:" + floorElement.position * mainGrid.tileSize + "px;", "width:" + ((levelInfo.size.x + 3) * 100) + "px;", "height:100px;", "background-image:url('" + floorObjectImageSRC + "');"] }]), "")
            elementsContainer.innerHTML += floorObjectText
        }
        for (let i = 0; i < levelInfo.roadsElements.length; i++) {
            roads.push(new road(gameScene, levelInfo.roadsElements[i].yPosition, levelInfo.roadsElements[i].speed, "road-" + i, levelInfo.roadsElements[i].direction, levelInfo.size, levelInfo.roadsElements[i].enemy))
        }
        for(let i = 0; i < roads.length; i++){
            roads[i].updateEnemiesReferences()
        }
        gameFrog.updateObjectReference()
    }
}

class enemy extends object {
    constructor(objectScene, position, speed, direction, enemyId, enemyImageInfo) {
        super(enemyId, objectScene, position, new vector2(100, 100), true)
        this.enemyId = enemyId
        this.enemyImageInfo = enemyImageInfo
        this.speed = speed
        this.setPosition(position)
        this.position = position
        this.object.style.zIndex = 2
        this.direction = direction
        this.object.src = enemyImageInfo.image.imageURL
        this.setImage("../img/armaggon.gif", enemyImageInfo.image.size, enemyImageInfo.image.center)
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
            if(superLifes <= 0){
                lifes = lifes - 1
                lifesContainer.innerHTML = "Vidas: " + lifes
                if(actualCharacter.characterSuperLifes > 0){
                    superLifes = actualCharacter.characterSuperLifes
                    specialAvilityContainer.innerHTML = "Supervidas: " + actualCharacter.characterSuperLifes
                }
                if(lifes <= 0){
                    window.location.reload() // TODO Make the death animation
                }else{
                    actualLevel = actualLevel - 1
                    gameFrog.object.src = actualCharacter.deadImageULR.imageURL
                    gameFrog.setImage(actualCharacter.deadImageULR.imageURL, new vector2(50, 50), new vector2(25, -8))
                    gameFrog.move(new vector2(0, 0))
                    startLoadingLevel()
                }
            }else{
                superLifes -= 1
                specialAvilityContainer.innerHTML = "Supervidas: " + superLifes
                superDead = true
                foregroundContainer.style.backdropFilter = "grayScale(1)"
                movementTimeout = 10000/actualCharacter.speed
            }
        }
    }
}

class road {
    constructor(objectScene, YPosition, speed, roadId, direction = "l", levelSize, enemyName) {
        this.YPosition = YPosition * 100
        this.levelSize = levelSize
        this.speed = speed
        this.objectScene = objectScene
        this.roadId = roadId
        this.numberOfEnemies = 0
        this.direction = direction
        this.disabledEnemies = []
        this.enemyName = enemyName
        this.enemies = [this.generateEnemy()]
        let distanceBetweenEnemies = (speed / 5) * (1000 / 25) * 2
        if (direction == "l") {
            let distance = distanceBetweenEnemies
            while (distance <= (this.levelSize.x + 2) * 100) {
                this.enemies.push(this.generateEnemy())
                this.enemies[this.enemies.length - 1].move(new vector2(distance, 0))
                distance += distanceBetweenEnemies
            }
        } else {
            let distance = -distanceBetweenEnemies
            while (distance >= -(this.levelSize.x + 2) * 100) {
                this.enemies.push(this.generateEnemy())
                this.enemies[this.enemies.length - 1].move(new vector2(distance, 0))
                distance -= distanceBetweenEnemies
            }
        }
        this.nextEnemyGeneration = 0
    }

    getEnemyInformation(){
        let finalEnemyInfo = enemiesInfo.find((actualValue) => {
            return actualValue.name == this.enemyName
        })
        if(finalEnemyInfo){
            return finalEnemyInfo
        }else{
            alert("The enemy " + this.enemyName + " does not exist.")
            return enemiesInfo[0]
        }
    }

    generateEnemy() {
        let horizontalPosition
        let enemySpeed
        if(this.direction == "l"){
            horizontalPosition = -200
            enemySpeed = this.speed
        }else{
            horizontalPosition = (levels[actualLevel - 1].size.x + 2) * 100
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
            return new enemy(this.objectScene, generationPosition, enemySpeed,  this.direction, this.roadId + "-" + ++this.numberOfEnemies, this.getEnemyInformation())
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
        for (let i = 0; i < this.disabledEnemies.length; i++) {
            this.disabledEnemies[i].updateObjectReference()
        }
    }

    disableEnemy(enemyId){
        this.enemies[enemyId].object.style.display = "none"
        let realEnemyId = this.enemies[enemyId].enemyId
        this.disabledEnemies.push(this.enemies[enemyId])
        let enemyObjectId = this.enemies[enemyId].object.id
        this.enemies = removeFromAnArray(this.enemies, enemyId)
    }

    update(){
        for(let i = 0; i < this.enemies.length; i++){
            this.enemies[i].update()
            if(this.direction == "l"){
                if(this.enemies[i].position.x > (this.levelSize.x + 2) * 100){
                // if(this.enemies[i].position.x > (this.objectScene.actualLevel.size.X + 1) * 100){
                    this.disableEnemy(i)
                }
            }else{
                if(this.enemies[i].position.x < -200){
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
            let money = localStorage.getItem('money')
            if(!money){
                money = 0
            }else{
                money = parseInt(money)
            }
            localStorage.setItem('money', money + 10)
            startLoadingLevel()
        }
    }
}

class frogInfo{
    constructor(stayImage, runningImage){
        this.stayImage = stayImage
        this.runningImage = runningImage
    }
}

let frogsInformation = [
    new frogInfo(
        new imageInfo("../img/")
    )
]

class characterInfo {
    constructor(characterName, stayImageURL, movingImageURL, deadImageURL, characterLifes, characterSuperLifes, speed) {
        this.characterName = characterName
        this.stayImageURL = stayImageURL
        this.movingImageURL = movingImageURL
        this.deadImageULR = deadImageURL
        this.characterLifes = characterLifes
        this.characterSuperLifes = characterSuperLifes
        this.speed = speed
    }
}

let characters = [
    new characterInfo("Jennica",
        new imageInfo(imagesFolder + "yellow.gif", new vector2(50, 50), new vector2(10, -30)),
        new imageInfo(imagesFolder + "yellowfow.gif", new vector2(50, 50), new vector2(10, -30)),
        new imageInfo(imagesFolder + "muerteamarillo.gif", new vector2(50, 50), new vector2(10, -30)), 6, 1, 10),
    new characterInfo("Leo",
        new imageInfo(imagesFolder + "leo.gif", new vector2(50, 50), new vector2(10, -30)),
        new imageInfo(imagesFolder + "leopalante nuevo.gif", new vector2(50, 50), new vector2(10, -30)),
        new imageInfo(imagesFolder + "muerteazul.gif", new vector2(50, 50), new vector2(10, -30)), 4, 0, 12),
    new characterInfo("Rafael",
        new imageInfo(imagesFolder + "rafa.gif", new vector2(50, 50), new vector2(10, -30)),
        new imageInfo(imagesFolder + "rafapalante.gif", new vector2(50, 50), new vector2(10, -30)),
        new imageInfo(imagesFolder + "muerterojo.gif", new vector2(50, 50), new vector2(10, -30)), 2, 0, 20),
    new characterInfo("Michelangelo",
        new imageInfo(imagesFolder + "miguel.gif", new vector2(50, 50), new vector2(10, -30)),
        new imageInfo(imagesFolder + "miguelpalante.gif", new vector2(50, 50), new vector2(10, -30)),
        new imageInfo(imagesFolder + "muertenaranja.gif", new vector2(50, 50), new vector2(10, -30)), 3, 0, 15),
    new characterInfo("Donnatelo",
        new imageInfo(imagesFolder + "dona.gif", new vector2(50, 50), new vector2(10, -30)),
        new imageInfo(imagesFolder + "palante.gif", new vector2(50, 50), new vector2(10, -30)),
        new imageInfo(imagesFolder + "muertemorado.gif", new vector2(50, 50), new vector2(10, -30)), 3, 0, 15)
]

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
    level.innerHTML = "Nivel: " + levels[actualLevel - 1].name
    levelInfoName.innerHTML = levels[actualLevel - 1].name
    levelInfoName.style.filter = "opacity(100%)"
    clearTimeout(levelLoadingTimeout)
    gameFrog.object.src = actualCharacter.stayImageURL.imageURL
    gameFrog.setImage(actualCharacter.deadImageULR.imageURL, new vector2(50, 50), new vector2(25, -39))
    gameFrog.move(new vector2(0, 0))
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
            gameFrog.object.src = actualCharacter.movingImageURL.imageURL
            // gameFrog.setImage(actualCharacter.movingImageURL.imageURL, actualCharacter.movingImageURL.size, actualCharacter.movingImageURL.position)
        }
        clearTimeout(frogMovementTimeout)
        frogMovementTimeout = setTimeout(function () { onMovement = false; if(actualCharacter){gameFrog.object.src = actualCharacter.stayImageURL.imageURL}}, movementTimeout)
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
                movementTimeout = 5000/actualCharacter.speed
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

    character = document.getElementById('character')
    level = document.getElementById('level')
    lifesContainer = document.getElementById('lifes')
    specialAvilityContainer = document.getElementById('specialAvility')

    level.innerHTML = "Nivel: " + levels[0].name

    let selectedCharacterId = localStorage.getItem("selectedCharacterId")
    if(!selectedCharacterId){
        selectedCharacterId = 0
    }
    actualCharacter = characters[selectedCharacterId]
    // actualCharacter = characters[2]
    character.innerHTML = actualCharacter.characterName
    lifesContainer.innerHTML = "Vidas: " + actualCharacter.characterLifes
    if(actualCharacter.characterSuperLifes > 0){
        specialAvilityContainer.innerHTML = "Supervidas: " + actualCharacter.characterSuperLifes
    }else{
        specialAvilityContainer.style.display = "none";
    }

    pageTitle = document.getElementById('pageTitle')
    foregroundContainer = document.getElementById('foregroundContainer')

    appContainer = document.getElementById('app')
    elementsContainer = document.getElementById('elementsContainer')

    // leftGradientElement = document.getElementById('leftGradientElement')
    // rightGradientElement = document.getElementById('rightGradientElement')

    gameScene = new scene(update, elementsContainer)
    keyboardEvent = new KeyboardEvent("keydown")
    mainGrid = new grid(elementsContainer, 6, 6, 100)

    // Generate the mainCharacter
    gameFrog = new frog(mainGrid, gameScene, "mainCharacter", new vector2(30, 30), new vector2(40, 40))
    gameFrog.object.src = actualCharacter.stayImageURL.imageURL
    gameFrog.setImage(actualCharacter.stayImageURL.imageURL, new vector2(50, 50), new vector2(25, -39))
    gameScene.addObject("frog", gameFrog)
    lifes = actualCharacter.characterLifes
    superLifes = actualCharacter.characterSuperLifes
    movementTimeout = 5000 / actualCharacter.speed

    // enemyContainer = document.getElementById('enemy')
    // enemyContainer = new object("enemy", gameScene, new vector2(50,0),new vector2(0,0), enemyContainer)
    // gameScene.addObject("enemy", enemy)

    pauseMenu = document.getElementById('pauseMenu')
    pauseMenuToggle = new toggleMenu(pauseMenu, 'hidden-menu')
    document.onkeydown = keyEvent;

    continueButton = document.getElementById('continueButton')
    continueButton.addEventListener("click", () => {
        pauseMenuToggle.toggleToState(true)
        notPaused = true
    })

    levelManager.loadLevel(levels[0])
    levelLoadingTimeout = setTimeout(showLevelName, 800)

});