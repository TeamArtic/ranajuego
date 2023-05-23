let elementsContainer,elementsContainer2, keyboardEvent, gameFrog, frogContainer, mainGrid

class level {

}

class frog extends gridObject {
    constructor(objectGrid, object) {
        super(objectGrid, new vector2(0, 0), object)
    }
}

window.addEventListener('load', () => {
    elementsContainer = document.getElementById('elementsContainer')
    elementsContainer2 = document.getElementById('elementsContainer2')
    keyboardEvent = new KeyboardEvent("keydown")
    frogContainer = document.getElementById('frogContainer')
    mainGrid = new grid(elementsContainer, 4, 8, 100)
    gameFrog = new frog(mainGrid, frogContainer)
    document.onkeydown = moveCharacter;
})

// function moveFrog(){
//     gameFrog.gridMove(new vector2(2, 2))
// }

function moveCharacter(e) {
    switch (e.keyCode) {
        case 87:
            gameFrog.gridMove(new vector2(0, -1))
            break;
        case 65:
            gameFrog.gridMove(new vector2(-1, 0))
            break;
        case 83:
            gameFrog.gridMove(new vector2(0, 1))
            break;
        case 68:
            gameFrog.gridMove(new vector2(1, 0))
            break;
    }
}