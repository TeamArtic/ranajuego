class toggleMenu{
    constructor(menu, activatedClass){
        this.menu = menu
        this.activatedClass = activatedClass
        this.enabled = false
    }

    toggle(){
        if(this.menu.classList.contains(this.activatedClass)){
            this.menu.classList.remove(this.activatedClass)
            this.enabled = false
        }else{
            this.menu.classList.add(this.activatedClass)
            this.enabled = true
        }
    }

    toggleToState(state){
        this.enabled = state
        if(state){
            this.menu.classList.add(this.activatedClass)
        }else{
            this.menu.classList.remove(this.activatedClass)
        }
    }
}