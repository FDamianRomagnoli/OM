import {CarStorage} from '../libs/CarStorage.js'

class productCard extends HTMLElement {

    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    static get observedAttributes() {
        return ["url","titleproduct","priceproduct","shipping","idproduct"];
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if (attr === "url") {
          this.url = newVal;
        }
        if (attr === "titleproduct") {
            this.titleproduct = newVal;
          }
        if (attr === "priceproduct") {
          this.priceproduct = newVal;
        }
        if (attr == "shipping") {
            this.shipping = newVal;
        }
        if (attr == "idproduct") {
            this.idproduct = newVal;
        }
        if (attr == "brand") {
            this.brand = newVal;
        }


      }

    getTemplate(){
        const template = document.createElement("TEMPLATE");
        const widthPage = document.body.clientWidth;

        let freeShipping = this.shipping == "true" ? widthPage >= 1024 ? "<span class='product-envio-d'>Envio Gratis</span>" : "<img class='product-envio' src='./img/envio-gratis.png'>" : ""
        const carStorage = new CarStorage(document.querySelector('.header-shopping-cart-counter'), 'openMarketCar')
        let buttonContent = carStorage.existsProduct(this.idproduct) ? "AGREGADO" : "SUMAR AL CARRITO"
        
        let title = this.titleproduct

        if(widthPage > 350 && widthPage < 1024){
            title = this.titleproduct.slice(0,47).trim()+(this.titleproduct.length > 48 ? "..." : "")
        }

        template.innerHTML = `

            <article class="product-card">
                <div class="product-image"></div>
                <span class="product-title">${title}</span>
                ${freeShipping}
                <span class="product-price">$${this.priceproduct}</span>
                <button class="product-button">${buttonContent}</button>
            </article>

            <style>
                ${this.getStyle()}
            </style>

        `;
        return template;
    }

    getStyle(){
        return `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                user-select: text;
            }

            :host{
                display: inline-block;
            }

            .product-card{
                position: relative;
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding: 7px 10px;
                min-height: 250px;
                background: #FFFFFF;
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
                border-radius: 5px;
            }

            .product-title{
                display: block;
                font-size: 17px;
                font-family: sansProLight;
                height: ${document.body.clientWidth > 350? "80px" : "auto"};
            }

            .product-price{
                font-family: interLight;
                font-size: 19px;
                color: #2265B5;
            }

            .product-envio{
                position: absolute;
                top: 10px;
                right: 10px;
                width: 35px;
                height: 35px;
            }

            .product-envio-d{
                font-size: 20px;
                font-family: sansProBold;
                color: #D582EA;
            }

            .product-image{
                background-image: url(${this.url});
                height: 110px;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
            }

            .product-button{
                font-family: sansProBold;
                font-size: 14px;
                background-color: #233560;
                color: #FFF;
                border: none;
                outline: none;
                height: 35px;
                border-radius: 5px;
                margin-bottom: 3px;
                transition: all .5s;
                cursor: pointer;
                user-select: none;
            }

            .product-button:hover{
                box-shadow: inset 0px 35px 4px rgba(0, 0, 0, 0.25);
            }

            @media (max-width: 350px){
                .product-title{
                    font-size: 18px;
                }
                .product-card{
                    min-height: 300px;

                }
                .product-image{
                    height: 140px;
                }
            }

            @media (min-width: 1024px){
                .product-card{
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr;
                    grid-template-rows: repeat(4, min-content);
                    gap: 15px;
                    height: 220px;
                    grid-template-areas: 
                    "image title title title"
                    "image price price price"
                    "image shipping shipping shipping"
                    "image button button button"
                    ;
                    align-content: center;
                    align-items:center;
                }

                .product-title{
                    grid-area: title;
                    font-size: 24px;
                    height: auto;
                }

                .product-shipping{
                    grid-area: shipping;
                }

                .product-price{
                    grid-area: price;
                    font-size: 28px;
                }

                .product-button{
                    grid-area: button;
                    width: 230px;
                    height: 45px;
                    font-size: 20px;
                }

                .product-button:hover{
                    box-shadow: inset 0px 45px 4px rgba(0, 0, 0, 0.25);
                }

                .product-image{
                    grid-area: image;
                    height: 180px;
                }

            }

        `
    }

    handleEvent(event) {
        if (event.type === "click"){
            const carStorage = new CarStorage(document.querySelector('.header-shopping-cart-counter'), 'openMarketCar')
            carStorage.addProduct(this.idproduct)
            this.button.innerHTML = "AGREGADO"
        }
         
      }

    render(){
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
        this.button = this.shadowRoot.querySelector('.product-button')
        this.button.addEventListener('click',this)
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        this.shadowRoot.innerHTML = "";
    }

}


export function productCardDefine(){
    customElements.define("product-card", productCard);
}

export function createProductCard(product){
    let envioGratis = product["price"] > 5.000 ? true : false
    return `
        <product-card
            url='${product["img"]}'
            priceproduct='${product["price"]}'
            titleproduct='${product["title"]}'
            idproduct = '${product["id"]}'
            shipping = ${envioGratis}
        ></product-card>
    `
}