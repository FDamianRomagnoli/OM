const contenedorProducto = document.querySelector(".product-container");
const cartelProductoNoEncontrados = contenedorProducto.nextElementSibling;
const loading = document.querySelector('.loading');
const inputSearch = document.querySelector('.inputSearch');
const btnSearch = inputSearch.nextElementSibling;
const contenedorResultadosEncontrados = document.querySelector(".products h3");
const resultadosEncontrados = contenedorResultadosEncontrados.firstElementChild;
const optionSort = document.querySelector(".sort");
const btnFiltro = document.querySelector(".filter");
const btnFiltroExit = document.querySelector(".filters-exit");
const btnClean = document.querySelector(".filter-button-clean");
const checkboxAll = document.querySelectorAll("[type='checkbox']");
const formFiltros = document.filters;

let formularioFiltro = false;
let checkFiltrosMarca = [];
let checkFiltrosProducto = [];

let checkGuardados  = () =>{
    let lista;
    checkboxAll.forEach(e =>{
        lista.push(false);
    })
}


function main(){

    fetch('./json/products.json')
    .then(response => {return response.json()})
    .then(myJson => {

        actualizarProductos(myJson);

        optionSort.addEventListener("change", () => actualizarProductos(myJson));

        inputSearch.addEventListener("change", () => {
            limpiarSelector();
            actualizarProductos(myJson);
        });

        btnSearch.addEventListener("change", () => {
            limpiarSelector();
            actualizarProductos(myJson);
        });

        pageSelection.btnAtras.addEventListener("click", () => {
            actualizarProductos(myJson)
        });

        pageSelection.btnSiguiente.addEventListener("click", () => {
            actualizarProductos(myJson)
        });

        formFiltros.addEventListener("submit", event => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            checkFiltrosMarca = formData.getAll('filter-brand');
            checkFiltrosProducto = formData.getAll('filter-product');
            limpiarSelector();
            actualizarProductos(myJson);
            setTimeout(vistaFormulario(),300);
        })

        btnClean.addEventListener("click", () => {

            cancelarLimpieza = [];
            checkboxAll.forEach(check => {
                cancelarLimpieza.push(check.checked);
                check.checked = false;
            })


        });

    });

    btnFiltro.addEventListener("click", () => vistaFormulario());



    btnFiltroExit.addEventListener("click", () => {
        for(index = 0; index < checkboxAll.length ; index++){
            checkboxAll[index].checked = cancelarLimpieza[index];
        }
        vistaFormulario();
    });

}


function actualizarProductos(lista){

    let listaFiltrada = filtrarPorCheckbox(lista);
    listaFiltrada = buscarCoincidencia(inputSearch.value, listaFiltrada);
    setearNumeroMaximoPaginas(listaFiltrada.length);
    actualizarBotones();
    animarReload(listaFiltrada.length);
    
    setTimeout(()=>{
        contenedorProducto.innerHTML = procesarProductos(listaFiltrada);
    }, 1000);


}


function filtrarListaPorPagina(lista, paginaActual){

    let listaFiltrada = [];
    let desde = paginaActual * 10 - 10;
    let hasta = paginaActual * 10 - 1;

    for(let indice = 0; indice <= hasta; indice++){
        if(indice >= desde && indice <= hasta && lista[indice] != undefined ){
            listaFiltrada.push(lista[indice]);
        }
    }

    return listaFiltrada;
}

function mostrarCoincidencias(longitudLista){
    resultadosEncontrados.innerHTML = longitudLista;

    if(longitudLista == 0){
        agregarDisplayHTML(cartelProductoNoEncontrados, "flex");
        eliminarDisplayHTML(contenedorProducto);
        return;
    }

    agregarDisplayHTML(contenedorProducto, "grid");
    eliminarDisplayHTML(cartelProductoNoEncontrados);
}

function setearNumeroMaximoPaginas(longitudLista){
   let paginaMax = Math.trunc((longitudLista / 10)) + 1;
   pageSelection.maximo = paginaMax;
}


function filtrarPorCheckbox(lista){
    lista = filtrarPor(lista,"brand",checkFiltrosMarca);
    lista = filtrarPor(lista,"product",checkFiltrosProducto);
    return lista;
}




function filtrarPor(lista, llave, checkList){
    if(checkList.length != 0){
        let listaFiltrada = lista.filter(producto => {
            return checkList.includes(producto[llave]);
        })
        return listaFiltrada;
    }

    return lista;

}




function procesarProductos(lista){

    let sortValue = optionSort.options[optionSort.selectedIndex].value;

    let listaOrdenada = ordenarLista(lista, sortValue);

    let listaPorPagina = filtrarListaPorPagina(listaOrdenada, pageSelection.contador);

    let html = "";

    listaPorPagina.forEach(element => {
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

    let nuevaLista =  lista.filter(product => { 
        return contienePalabra(product["title"],listaDePalabras,product["brand"],product["product"]);
    });

    return nuevaLista;
}

function contienePalabra(titulo, palabras, marca, producto){

    let coincidencia = false;

    titulo = titulo.toLowerCase();
    producto = producto.toLowerCase();

    palabras = palabras.map(palabra => palabra.toLowerCase());

    palabras.forEach(palabra => {
        if(palabra != " " && (titulo.includes(palabra) || marca.includes(palabra) || producto.includes(palabra))){
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
        formFiltros.style.animationName = "desaparecer";
        formFiltros.style.animationIterationCount = "1";
        setTimeout(() => {
            formFiltros.style.animationName = "none";
            formFiltros.style.display = "none";
        },270);
    }else{
        formFiltros.style.display = "grid";
        formFiltros.style.animationName = "aparecer";
        formFiltros.style.animationIterationCount = "1";
        setTimeout(() => {
            formFiltros.style.animationName = "none";
        },270);
        
    }

    formularioFiltro = !formularioFiltro;
}



function animarReload(longitudLista){

    desaparecerElementoHTML(pageSelection.contenedor);
    desaparecerElementoHTML(contenedorResultadosEncontrados);
    eliminarDisplayHTML(cartelProductoNoEncontrados);
    eliminarDisplayHTML(contenedorProducto);
    agregarDisplayHTML(loading, "flex");

    setTimeout(()=>{
        agregarDisplayHTML(contenedorProducto, "grid");
        aparecerElementoHTML(pageSelection.contenedor);
        aparecerElementoHTML(contenedorResultadosEncontrados);
        eliminarDisplayHTML(loading);
        mostrarCoincidencias(longitudLista);
    }, 1010);
}

function desaparecerElementoHTML(elemento){
    elemento.style.opacity = '0';
}

function aparecerElementoHTML(elemento){
    elemento.style.opacity = '1';
}

function eliminarDisplayHTML(elemento){
    elemento.style.display = 'none';
}

function agregarDisplayHTML(elemento, tipo){
    elemento.style.display = tipo;
}

main();