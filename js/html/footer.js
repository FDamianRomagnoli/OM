const footerHTML = document.querySelector('#footer')
import {sliderRun} from '../libs/slider.js'



function main(){
    getHTMLFooter(footerHTML)
    const style = document.createElement("style")
    document.getElementsByTagName("head")[0].appendChild(style)
}

function getHTMLFooter(footerElement){

    fetch('./json/brands.json')
        .then(response => response.json())
        .then(json => {
            let carouselItems = "";
            json.map(img => {
                carouselItems += `<img src="${img["src"]}" alt="imagen de marca" class="Carousel-item" >`
            })
            footerElement.innerHTML = `
            <section class="footer__brand Carousel-container">
                ${carouselItems}
            </section>

            <section class="footer__main-content" >
                <img class="footer__logo" src="./img/logo.svg" alt="logo de la empresa open market">

                <div class="footer__description">
                    <span class="footer__title">Sobre nosotros</span>
                    <span class="footer__text">
                    Somos una empresa enfocada al <span class="footer_text-blue">comercio electronico</span> de celulares y accesorios.<br>
                    Nuestro principal objetivo es preservar la <span class="footer_text-blue">seguridad del cliente</span> al realizar compras en internet.
                    </span>
                </div>

                <div class="footer__social">
                    <span class="footer__title">Seguinos en</span>
                    <div class="footer__social-container">
                        <img src="./img/fcbook.svg" alt="Icono de empresa">
                        <img src="./img/instagram.svg" alt="Icono de empresa">
                        <img src="./img/twit.svg" alt="Icono de empresa">
                        <img src="./img/youtube.svg" alt="Icono de empresa">
                    </div>
                </div>

                <div class="footer__help">
                    <span class="footer__title">Ayuda</span>
                    <span class="footer__text">Si tenés alguna duda o sugerencia</span>
                    <button class="btnRect">
                        <span class="btn__text">CONTACTANOS</span>
                        <svg>
                            <rect class="rect1" x="0" y="0" fill="none"></rect>
                            <rect class="rect2" x="0" y="0" fill="none"></rect>
                        </svg>
                    </button>
                </div>

            </section>
    
            <section class="footer__copy">
                @ Copyright Open Marker 2022
            </section>
        `

        const imgs = document.querySelectorAll('.footer__social img')
        Array.from(imgs).forEach(img => {
            img.addEventListener("click", () =>{
                window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            })
        })

        sliderRun()
        })

}

main()