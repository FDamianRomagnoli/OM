import { CarStorage } from "../libs/CarStorage.js"
import { DriverElement } from "../libs/DriverElement.js"

const colorClass = ["card_red","card_blue","card_green","card_purple"]
const priceBases = []

var counterColor = 0
var priceTotally 
var quantityProducts 

const containerMain = new DriverElement('.card_main-container')
const carStorage = new CarStorage(document.querySelector('.header-shopping-cart-counter'), 'openMarketCar')

const quantityTotallyElement = document.querySelector('.quantity-summary')
const priceTotallyElement = document.querySelector('.price-summary')

let main = () => {


    
    updateViewCart()

    let list = document.getElementById('card_main')
    list.addEventListener('click', (e) => {

        let elementClick = e.target

        if(elementClick.classList.contains("cart_card-unit-button-subtraction")){
            subtractionProduct(elementClick)
        }else if(elementClick.classList.contains("cart_card-unit-button-addition")){
            additionProduct(elementClick)
        }else if(elementClick.classList.contains("cart_card-delete")){
            deleteProduct(elementClick)
        }else if(elementClick.classList.contains("trash-all")){
            carStorage.resetProduct()
            updateViewCart()
        }else if(elementClick.classList.contains("buy-cart")){
            console.log("Comprando Carrito")
        }

   } )
}

let additionProduct = element => {
    let idProduct = getIdCard(element)
    let priceElement = getElementPrice(element)
    let quantityValue = carStorage.additionQuantity(idProduct)
    let priceBase = priceBases.find(object => object.id == idProduct).price
    updatePrice(priceElement, priceBase, quantityValue)
    modifySummary(priceBase)
    getElementUnit(element).innerHTML = quantityValue
}

let subtractionProduct = element => {
    let idProduct = getIdCard(element)
    if(carStorage.getQuantity(idProduct) > 1){
        let priceElement = getElementPrice(element)
        let quantityValue = carStorage.subtractionQuantity(idProduct)
        let priceBase = priceBases.find(object => object.id == idProduct).price
        updatePrice(priceElement, priceBase, quantityValue)
        modifySummary(-priceBase)
        getElementUnit(element).innerHTML = quantityValue
    }

}

let deleteProduct = element => {
    carStorage.deleteProduct(getIdCard(element))
    updateViewCart()
}

let getIdCard = element => {
    if(element.classList.contains("cart_card-container")){
        return element.id
    }else{
        return getIdCard(element.parentNode)
    }
}

let getElementUnit = element => {
    return element.parentNode.previousElementSibling.firstElementChild
}

let updatePrice = (elementPrice, priceBase, quantity) => {
    let newPrice = priceBase * quantity
    elementPrice.innerHTML = `$${Intl.NumberFormat('es-ES').format(newPrice)}`
}

let modifySummary = (price) => {
    quantityProducts = price < 0 ? quantityProducts - 1 : quantityProducts + 1
    priceTotally += price
    quantityTotallyElement.innerHTML = quantityProducts
    priceTotallyElement.innerHTML = "$" + Intl.NumberFormat('es-ES').format(priceTotally)
}

let getElementPrice = element => {
    return element.parentNode.previousElementSibling.previousElementSibling
}


let updateViewCart = () => {

    containerMain.cleanHTML()
    quantityProducts = 0
    priceTotally = 0

    fetch('./json/products.json').then(response => response.json())
    .then(json => {

        counterColor = 0
        let dataCart = carStorage.getData()
        let idCart = dataCart.map(data => data.idProduct)
        let listProductCart = json.filter(product => idCart.includes(product.id) )

        if(listProductCart.length != 0){

            listProductCart.forEach(product => {
                let quantity = dataCart.filter(data => data.idProduct == product.id)[0].quantity
                containerMain.insertHTML(createCodeHtml(product, quantity))
            })}

        else{
            containerMain.insertHTML(createNotFindProductHtml())
        }
        


        

        quantityTotallyElement.innerHTML = quantityProducts
        priceTotallyElement.innerHTML = "$" + Intl.NumberFormat('es-ES').format(priceTotally)

    })

}

let createNotFindProductHtml = () => {
    return `
        <div class="not-product-container">
            <div class="not-product-cart"></div>
            <span class="cart_card-unit not-product-title">Aún no hay productos
            en el carrito!</span>
            <span class="not-product-description">Agrega primero un producto para poder visualizar el carrito</span
        </div>
    `
}

let createCodeHtml = (product,quantity) => {


    quantityProducts += quantity //Mantengo un control de la cantidad de productos para el resumen
    priceTotally += product.price * quantity //Control del precio total para el resumen
    priceBases.push({
        id : product.id,
        price : product.price
    })

    let color = colorClass[counterColor]
    counterColor = counterColor == 3 ? 0 : counterColor + 1
    let image = document.createElement("div")
    image.classList = "cart_card-image"
    image.style.backgroundImage = `url(${product.img})`

    return `
        <article class="cart_card-container cart_card-style ${color}" id="${product.id}">
            <button class="cart_card-delete"></button>
            <div class="cart_card-image-container">
                ${image.outerHTML}
            </div>
            <span class="cart_card-title">${product.title.toUpperCase()}</span>
            <span class="cart_card-price">$${Intl.NumberFormat('es-ES').format(product.price*quantity)}</span>
            <span class="cart_card-unit">Cantidad: <span class="cart_card-unit-number">${quantity}</span><span>u</span></span>
            <div class="cart_card-unit-buttons">
                <button class="cart_card-unit-button-subtraction"></button>
                <button class="cart_card-unit-button-addition"></button>
            </div>
        </article>
    `
}

main()

