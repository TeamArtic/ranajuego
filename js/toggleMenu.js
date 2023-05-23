class toggleMenu{
    constructor(menu, activatedClass){
        this.menu = menu
        this.activatedClass = activatedClass
    }

    toggle(){
        if(this.menu.classList.contains(this.activatedClass)){
            this.menu.classList.remove(this.activatedClass)
        }else{
            this.menu.classList.add(this.activatedClass)
        }
    }

    toggleToState(state){
        if(state){
            this.menu.classList.add(this.activatedClass)
        }else{
            this.menu.classList.remove(this.activatedClass)
        }
    }
}