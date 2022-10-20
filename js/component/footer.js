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
                    <button class="button-rect footer-button-rect">
                        <span class="button-rect-text footer__title">CONTACTANOS</span>
                        <svg class="button-rect-svg">
                            <rect class="button-rect-svg-rect1"  fill="none"></rect>
                            <rect class="button-rect-svg-rect2"  fill="none"></rect>
                        </svg>
                    </button>
                </div>

            </section>
    
            <section class="footer__copy">
                @ Copyright Open Marker 2022
            </section>
        `

        document.querySelector('.footer-button-rect').addEventListener('click', () => {
            setTimeout(() => {
                location.href = './contact.html'
            }, 800)
        })

        const imgs = document.querySelectorAll('.footer__social img')
        Array.from(imgs).forEach(img => {
            img.addEventListener("click", () =>{
                setAnimation(img, "socialClick", ".6s", "linear")
                setTimeout(()=>{
                    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                    img.style.animation = "none"
                },500)
                
            })
        })

        const logo = document.querySelector('.footer__logo')
        logo.addEventListener("click", () =>{
            location.href = "https://fdamianromagnoli.github.io/OpenMarket-Front"
        })

        sliderRun()
        })

}

function setAnimation(element, nameAnimation, duration, functionAnimation){
    element.style.animationName = nameAnimation
    element.style.animationDuration = duration
    element.style.animationTimingFunction = functionAnimation

}

main()