const productContainer = document.querySelector(".product-container");
const resultadosEncontrados = document.querySelector(".products h3 span");
const optionSort = document.querySelector(".sort");
const inputSearch = document.querySelector(".inputSearch");
const btnFiltro = document.querySelector(".filter");
const btnFiltroExit = document.querySelector(".filters-exit");
const checkFiltrosMarca = document.querySelectorAll(".checkbox-filter-brand");
const checkFiltrosProducto = document.querySelectorAll(".checkbox-filter-product");
const checkFiltros = document.querySelectorAll(".checkbox-filter-brand,.checkbox-filter-product");
let formularioFiltro = false;


function main(){

    fetch('./json/products.json')
    .then(response => {return response.json()})
    .then(myJson => {

        productContainer.innerHTML = recorrerJson(myJson);

        optionSort.addEventListener("change", () => actualizarJson(myJson));

        inputSearch.addEventListener("change", () => actualizarJson(myJson));

        checkFiltros.forEach(check => {
            check.addEventListener("change", () => actualizarJson(myJson));
        });

    });

    btnFiltro.addEventListener("click", () => vistaFormulario());
    btnFiltroExit.addEventListener("click", () => vistaFormulario());

}

function actualizarJson(lista){
    let listaFiltrada = filtrarPorCheckbox(lista);
    listaFiltrada = buscarCoincidencia(inputSearch.value, listaFiltrada);
    productContainer.innerHTML = recorrerJson(listaFiltrada);
}

function filtrarPorCheckbox(lista){
    lista = filtrarPor("brand",lista,checkFiltrosMarca);
    lista = filtrarPor("product",lista,checkFiltrosProducto);
    return lista;
}

function filtrarPor(llave, lista, checkList){
    let ningunaElegida = true;
    let marcas = [];

    checkList.forEach(check => {
        if(check.checked){
            ningunaElegida = false;
            marcas.push(check.nextElementSibling.innerHTML);
        }
    });

    let listaFiltrada = lista.filter(producto => {
        return marcas.includes(producto[llave]);
    });

    return ningunaElegida == true? lista : listaFiltrada; 
}

function recorrerJson(lista){

    //Recorre el JSON y va creando los articulos, esta funcion retorna un String con el contenido HTML necesario.

    resultadosEncontrados.innerHTML = lista.length;

    let sortValue = optionSort.options[optionSort.selectedIndex].value;

    let listaOrdenada = ordenarLista(lista, sortValue);

    let html = "";

    listaOrdenada.forEach(element => {
        let envioGratis = tieneEnvioGratis(element["price"], 5.000);
        html = html + crearArticulo(element["title"],element["price"],element["img"],envioGratis);
    });

    return html;

}


function ordenarLista(lista, valueSort){
    switch(valueSort){
        case "1":
            return lista.sort((a,b) => {return b["relevance"] - a["relevance"]});
        case "2":
            return lista.sort((a,b) => {return b["price"] - a["price"]});
        case "3":
            return lista.sort((a,b) => {return a["price"] - b["price"]});
    }
}

function buscarCoincidencia(palabras, lista){
    listaDePalabras = palabras.trim().split(" ");
    let nuevaLista =  lista.filter(product => { return contienePalabra(product["title"],listaDePalabras,product["brand"]);});
    return nuevaLista;
}

function contienePalabra(titulo, palabras, marca){

    let coincidencia = false;

    titulo = titulo.toLowerCase();

    palabras = palabras.map(palabra => palabra.toLowerCase());

    palabras.forEach(palabra => {
        if(palabra != " " && (titulo.includes(palabra) || marca.includes(palabra))){
            coincidencia = true;
        }
    });

    return coincidencia;
}

function tieneEnvioGratis(precio, apartir){
    return precio > apartir ? `<img class="product-envio" src="./img/envio-gratis.png">` : "";
}

function crearArticulo(titulo, precio, imagen, envioGratis){
    return `
    <article class="product">
        <figure class="product-image">
            <img src="${imagen}">
        </figure>
        <h3 class="product-title">${titulo.slice(0,40) + "..."}</h3>
        <p class="product-price">$${precio}</p>
        ${envioGratis}
    </article>
    `;
}

function vistaFormulario(){
    if(formularioFiltro){
        document.filters.style.animationName = "desaparecer";
        document.filters.style.animationIterationCount = "1";
        setTimeout(() => {
            document.filters.style.animationName = "none";
            document.filters.style.display = "none";
        },490);
    }else{
        document.filters.style.display = "grid";
        document.filters.style.animationName = "aparecer";
        document.filters.style.animationIterationCount = "1";
        setTimeout(() => {
            document.filters.style.animationName = "none";
        },490);
        
    }

    formularioFiltro = !formularioFiltro;
}


main();