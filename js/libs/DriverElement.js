/* FACILITA EL MANEJO DE LOS ELEMENTOS HTML CON JS */


export class DriverElement{
    constructor(query){
        this.elementHTML = document.querySelector(query)
        this.display = (this.elementHTML).style.display
    }

    stopDisplay(){
        this.elementHTML.style.display = "none"
    }

    returnDisplay(){
        this.elementHTML.style.display = this.display
    }

    hideDisplay(){
        this.elementHTML.style.opacity = "0"
    }

    showDisplay(){
        this.elementHTML.style.opacity = "1"
    }

    setDisplay(configure){
        this.elementHTML.style.display = configure
    }

    onEvent(func, type = 'click'){
        this.elementHTML.addEventListener(type, func)
    }


    insertHTML(codeHTML){
        this.elementHTML.innerHTML = this.elementHTML.innerHTML + codeHTML
    }

    cleanHTML(){
        this.elementHTML.innerHTML = ""
    }

    replaceHTML(codeHTML){
        this.elementHTML.innerHTML = codeHTML
    }

    getSelectedIndex(){
        return this.elementHTML.options.selectedIndex
    }

}













