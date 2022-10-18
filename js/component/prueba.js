// import { CounterPage } from "../libs/CounterPage";
// import { productCardDefine } from "./product-card";
import {DriverElement} from '../libs/DriverElement.js'

let setting = {
    search: "",
    getQueryString : () => {
        const params = new Proxy(new URLSearchParams(window.location.search), 
        {get: (searchParams, prop) => searchParams.get(prop),})
        if(params.search != null){
            setting["search"] = params.search
        }
    }
}

window.onload = () => {

    fetch('./json/products.json')
    .then(response => {return response.json()})
    .then(listProduct => processProducts(listProduct))

}


function processProducts(listProducts){
    const containerProduct = new DriverElement('.product-container')
    
    
}








