let unlockedCharacters

function setCharacter(characterId){
    let actualCharacter = unlockedCharacters.find((element) => {
        return characterId == element.characterId
    })
    if(actualCharacter){
        if(actualCharacter.unlocked){
            localStorage.setItem('selectedCharacterId', characterId)
        }else{
            alert('No tienes este personaje')
        }
    }
}

window.addEventListener('load', () => {
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