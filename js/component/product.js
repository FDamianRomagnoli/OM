import { CounterPage } from "../libs/CounterPage.js"
import { productCardDefine, createProductCard } from "./product-card.js"
import {DriverElement} from '../libs/DriverElement.js'

function reload(){
    fetch('./json/products.json')
    .then(response => {return response.json()})
    .then(listProduct => processProducts(listProduct))
}

function processProducts(listProducts){

    listProducts = filterProductsOfSetting(listProducts)

    listProducts = sortingProductsOfSetting(listProducts)

    pagination.setMaxPageOfResults(listProducts.length)
    //DOM
    setTimeout(() => containerProduct.cleanHTML(), 300)
    setTimeout(() => {
        if(listProducts.length == 0){
            productZero.setDisplay("flex")
            containerProduct.stopDisplay()
            resultsFound.replaceHTML(`Nada por aqui..`)
        }else{
            productZero.stopDisplay()
            containerProduct.returnDisplay()
            insertProducts(listProducts, containerProduct)
            resultsFound.replaceHTML(`Resultados encontrados: <span class="number-text">${listProducts.length}</span>`)
        }

        resultsFound.showDisplay()


    }, 800)

}

function filterProductsOfSetting(listProducts){
    let queryStringSearch = setting.getQueryString()
    let brandFilters = setting.getFilter("brand")
    let productFilters = setting.getFilter("product")

    listProducts = queryStringSearch != false ? findReferences(listProducts, queryStringSearch) : listProducts
    listProducts = brandFilters != false ? filterList(listProducts, "brand", brandFilters) : listProducts
    listProducts = productFilters != false ? filterList(listProducts, "product", productFilters) : listProducts
    return listProducts
}

function sortingProductsOfSetting(listProducts){
    return listProducts.sort(setting.getFunctionSorting())
}

function insertProducts(listProducts, containerProduct){
    listProducts.forEach((product,index) => {
        if(index >= (pagination.getPage() - 1) * 10 && index <= (pagination.getPage() * 10) - 1 ){
            containerProduct.insertHTML(createProductCard(product))
        }
    });
}

function filterList(listProduct, key, tokenFilter){
    return listProduct.filter(product => {
        return tokenFilter.includes(product[key])
    })
}


function findReferences(listProduct, querys){
    querys = querys.toLowerCase().split(" ")
    return listProduct.filter(product => {
        return contentQuery(product, querys)
    })
}

function contentQuery(product, querys){

    let coincidencia = false;

    let title = product["title"].toLowerCase()
    let brand = product["brand"].toLowerCase()


    querys.forEach(query => {
        if(query != " " && (title.includes(query) || brand.includes(query))){
            coincidencia = true;
        }
    })

    return coincidencia;
}

/* DE AQUI PARA ABAJO SOLO HAY DECLARACIÓN DE VARIABLES Y CONSTANTES DE CONFIGURACIÓN */ 


/* SETTING ES UN OBJETO CON EL FIN DE FACILITAR FILTRAR LA LISTA JSON DE PRODUCTOS */

const setting = {
    getQueryString : () => {
        const params = new URLSearchParams(window.location.search)
        let getQuery = params.get('search')
        return getQuery == null || getQuery.trim() == "" ?  false : getQuery.trim()
    },
    getPage : () => {
        pagination.getPage()
    },
    getFilter : (key) => {
        if(filtersForm[key] != undefined && filtersForm[key].length != 0){
            return filtersForm[key]
        }else{
            return false
        }
    },
    sort : 0,
    setSort : newValue => { setting.sort = newValue },
    getFunctionSorting : () => {
        switch(setting.sort){
            case 0:
                return (a,b) => {return b["relevance"] - a["relevance"]}
            case 1:
                return (a,b) => {return b["price"] - a["price"]}
            case 2:
                return (a,b) => {return a["price"] - b["price"]}
        }
    }
}



/* ELEMENTOS DE PAGINACION */
const paginationButtonNext = new DriverElement('.btn-page-next')
const paginationButtonBack = new DriverElement('.btn-page-back')
const pagination = new CounterPage(paginationButtonNext.elementHTML,paginationButtonBack.elementHTML,'.page-num')

/* ELEMENTOS FORMULARIO*/
const settingFilterButton = new DriverElement('.setting-filter')
const filtersForm = new DriverElement('[name="product-filter"]')
const buttonCloseForm = new DriverElement('.product-filter-close')
const selectorSortMobile = new DriverElement('.setting-container .setting-sort')
const selectorSortDesktop = new DriverElement('#form-filter .setting-sort')

/* ELEMENTOS INFORMATIVOS */
const containerProduct = new DriverElement('.product-container')
const resultsFound = new DriverElement('#resultsFound')
const productZero = new DriverElement('.product-zero')

/* EVENTOS DE PAGINACION */
paginationButtonNext.onEvent(() => reload())
paginationButtonBack.onEvent(() => reload())

/* EVENTOS DE FORMULARIO */
settingFilterButton.onEvent(() => {
    filtersForm.setDisplay("flex");
})
buttonCloseForm.onEvent( () => {
    filtersForm.setDisplay("none")
})
filtersForm.onEvent((e) =>{
        e.preventDefault()
        pagination.reset()
        let formData = new FormData(e.currentTarget)
        document.body.clientWidth < 768 ? filtersForm.setDisplay("none") : null
        filtersForm["brand"] = formData.getAll('brand')
        filtersForm["product"] = formData.getAll('product')
        setTimeout(() => {
            resultsFound.hideDisplay()
            productZero.stopDisplay()
            containerProduct.returnDisplay()
        },300)
        reload()   
}, 'submit')
selectorSortMobile.onEvent( () => {
    setting.setSort(selectorSortMobile.getSelectedIndex())
    reload()
}, "change")
selectorSortDesktop.onEvent( () => {
    setting.setSort(selectorSortDesktop.getSelectedIndex())
    reload()
}, "change")

window.onload = () => {
    productCardDefine()
    reload()
}







