/* FACILITA EL MANEJO DE LOS ELEMENTOS HTML CON JS */


export class DriverElement{
    constructor(query){
        this.container = document.querySelector(query)
        this.display = (this.container).style.display
    }

    stopDisplay(){
        this.container.style.display = "none"
    }

    returnDisplay(){
        this.container.style.display = this.display
    }

    hideDisplay(){
        this.container.style.opacity = "0"
    }

    showDisplay(){
        this.container.style.opacity = "1"
    }

    onclick(func){
        this.container.addEventListener('click', func)
    }

    insertHTML(codeHTML){
        this.container.innerHTML = this.container.innerHTML + codeHTML
    }

    cleanHTML(){
        this.container.innerHTML = ""
    }

}













