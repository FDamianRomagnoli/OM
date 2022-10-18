import {startButtonHamburguer} from '../libs/hamburguer.js'
import {CarStorage} from '../libs/CarStorage.js'

function main(){

    const header = document.querySelector('.header')


    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });

    header.innerHTML = `

        <div class="main__header"> 
            <picture>
                <img src="./img/logo.png" class="logo_header" alt="Logo de la empresa" class="header__logo" width="68" height="38">
            </picture>

            <form method="GET" action="./products.html" class="inputSearch-container" name="inputSearch">
                <input type="text" class="inputSearch" placeholder="Buscar productos ..." name="search"
                value="${params.search === null ? '' : params.search}"
                autocomplete="off"
                >
                <button class="inputSearch-icon"></button>
            </form>

            <nav class="nav__desktop-user">
                <ul>
                    <li>
                        <button class="button-rect header-button-rect nav__desktop-btn-login">
                            <span class="button-rect-text header-rect-text">INICIAR SESIÓN</span>
                        <svg class="button-rect-svg">
                            <rect class="button-rect-svg-rect1"  fill="none"></rect>
                            <rect class="button-rect-svg-rect2"  fill="none"></rect>
                        </svg>
                        </button>
                    </li>

                    <li>
                        <button class="button-rect header-button-rect nav__desktop-btn-register">
                            <span class="button-rect-text header-rect-text">REGISTRARSE</span>
                            <svg class="button-rect-svg">
                                <rect class="button-rect-svg-rect1"  fill="none"></rect>
                                <rect class="button-rect-svg-rect2"  fill="none"></rect>
                            </svg>
                        </button>
                    </li>

                    <li>
                        <button class="header-shopping-cart">
                            <div class="header-shopping-cart-counter"></div>
                        </button>
                    </li>
                </ul>
            </nav>



            <div class="mobile__button"></div>

            <nav class="nav__mobile">
                <ul>
                    <li><a href="./index.html"><img src="img/font-home.svg" alt="icono de inicio">Inicio</a></li>
                    <li><a href=""><img src="img/font-login.svg" alt="icono de inicio de sesion">Ingresar</a></li>
                    <li><a href=""><img src="img/font-register.svg" alt="icono de registro">Registrarse</a></li>
                    <li><a href="./products.html"><img src="img/font-category.svg" alt="icono de categorias">Categorias</a></li>
                    <li><a href="./carrito.html"><img src="img/font-car.svg" alt="icono del carrito">Carrito</a></li>
                    <li><a href=""><img src="img/font-his.svg" alt="icono del historial">Historial</a></li>
                    <li><a href=""><img src="img/font-contact.svg" alt="icono de contacto">Contacto</a></li>
                </ul>

                <div class="nav__logo-container">
                    <img src="./img/logo.png" alt="Logo de la empresa">
                </div>

            </nav>
            <div class="nav__opacity"></div>
        </div>

        <nav class="nav__desktop">
            <ul>
                <li>
                    <a href="./products.html">PRODUCTOS</a>
                    <div></div>
                </li>
                <li>
                    <a href="./products.html">HISTORIAL</a>
                    <div></div>
                </li>
                <li>
                    <a href="./products.html">AYUDA</a>
                    <div></div>
                </li>
            </ul>
        </nav>
    

    `

    const nav = document.querySelector(".nav__mobile");
    const btnHam = document.querySelector(".mobile__button");
    const opacity = document.querySelector(".nav__opacity");
    startButtonHamburguer(nav,btnHam,opacity)

    document.inputSearch.addEventListener('submit', (event) => {
        event.preventDefault()
        setInterval(() =>{
            document.inputSearch.submit()
        },600)
    })

    const btnRegister = document.querySelector('.nav__desktop-btn-register');
    const btnLogin = document.querySelector('.nav__desktop-btn-login');

    btnRegister.addEventListener('click', () => timeOutButton('./index.html'))
    btnLogin.addEventListener('click', () => timeOutButton('./index.html'))

    const carStorage = new CarStorage(document.querySelector('.header-shopping-cart-counter'), 'openMarketCar')
    carStorage.updateCounter()


}



function timeOutButton(href){
    setTimeout(
        () =>{
            location.href = href
        }
    ,800)
}

main()


