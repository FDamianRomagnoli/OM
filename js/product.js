const contenedorProducto = document.querySelector(".product-container");
const cartelProductoNoEncontrados = contenedorProducto.nextElementSibling;
const loading = document.querySelector('.loading');
const inputSearch = document.querySelector('.inputSearch');
const contenedorResultadosEncontrados = document.querySelector(".products h3");
const resultadosEncontrados = contenedorResultadosEncontrados.firstElementChild;
const optionSort = document.querySelector(".sort");
const btnFiltro = document.querySelector(".filter");
const btnFiltroExit = document.querySelector(".filters-exit");
const btnClean = document.querySelector(".filter-button-clean");
const btnSearch = inputSearch.nextElementSibling;
const checkboxAll = document.querySelectorAll("[type='checkbox']");
const formFiltros = document.filters;


let formularioFiltro = false;
let checkFiltrosMarca = [];
let checkFiltrosProducto = [];

let checkGuardados  = obtenerValoresCheckbox();


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

        pageSelection.btnAtras.addEventListener("click", () => actualizarProductos(myJson));

        pageSelection.btnSiguiente.addEventListener("click", () => actualizarProductos(myJson));

        formFiltros.addEventListener("submit", event => {
            event.preventDefault(); //Evita recargar la pagina con el envio del formulario
            checkGuardados  = obtenerValoresCheckbox();
            const formData = new FormData(event.currentTarget);
            checkFiltrosMarca = formData.getAll('filter-brand');
            checkFiltrosProducto = formData.getAll('filter-product');
            limpiarSelector();
            actualizarProductos(myJson);
            vistaFormulario();
        })

        btnClean.addEventListener("click", () => { 
            formFiltros.reset();
            checkGuardados  = obtenerValoresCheckbox();
        });

    });



    btnFiltroExit.addEventListener("click", () => {

        checkboxAll.forEach((elemento,index) => {
            elemento.checked = checkGuardados[index];
        })
    
        vistaFormulario();
    });

    btnFiltro.addEventListener("click", () => vistaFormulario());

}

function actualizarProductos(lista){

    let listaFiltrada = filtrarPorCheckbox(lista);
    listaFiltrada = buscarCoincidencia(inputSearch.value, listaFiltrada);
    let cantidadDeResultados = listaFiltrada.length;
    setearNumeroMaximoPaginas(cantidadDeResultados);
    actualizarBotones();

    ocultarElementosPrincipales(); //Oculta todos los elementos para mostrar la animacion de carga
    mostrarLoading(); // Muestra el contenedor que posee la animacion  de carga


    setTimeout(()=>{
        contenedorProducto.innerHTML = procesarProductos(listaFiltrada);
        ocultarLoading(); //Oculta el contenedor que posee la animacion de carga
        aparecerElementosPrincipales(cantidadDeResultados); // Aparece los elementos que fueron ocultados
    }, 1000);


}

function obtenerValoresCheckbox(){
    return [...checkboxAll].map((elemento) =>{
        return elemento.checked;
    });
}


function filtrarListaPorPagina(lista, numeroDePagina){

    let desde = numeroDePagina * 10 - 10;
    let hasta = numeroDePagina * 10;
    return lista.slice(desde,hasta); //Corto el Array para mostrar 10 articulos por pagina

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




function filtrarPor(lista, key, listaFiltros){

    return listaFiltros == 0 ? lista : lista.filter(producto => {
        return listaFiltros.includes(producto[key]);
    });

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
        iniciarAnimacion(formFiltros, "aparecer", "reverse");

        setTimeout(() => {
            eliminarAnimacion(formFiltros);
            eliminarDisplayHTML(formFiltros);
        },270);

    }else{
        agregarDisplayHTML(formFiltros, "grid");
        iniciarAnimacion(formFiltros, "aparecer", "normal");

        setTimeout(() => {
            eliminarAnimacion(formFiltros);
        },270);
        
    }

    formularioFiltro = !formularioFiltro;
}

function iniciarAnimacion(elemento, nombreAnimacion, direccion){
    elemento.style.animationDirection = direccion;
    elemento.style.animationName = nombreAnimacion;
    elemento.style.animationIterationCount = "1";
}

function eliminarAnimacion(elemento){
    elemento.style.animationName = "none";
}

function mostrarLoading(){
    agregarDisplayHTML(loading, "flex");
}

function ocultarLoading(){
    eliminarDisplayHTML(loading);
}


function ocultarElementosPrincipales(){
    desaparecerElementoHTML(pageSelection.contenedor);
    desaparecerElementoHTML(contenedorResultadosEncontrados);
    eliminarDisplayHTML(cartelProductoNoEncontrados);
    eliminarDisplayHTML(contenedorProducto);
}

function aparecerElementosPrincipales(longitudLista){
    agregarDisplayHTML(contenedorProducto, "grid");
    aparecerElementoHTML(pageSelection.contenedor);
    aparecerElementoHTML(contenedorResultadosEncontrados);
    mostrarCoincidencias(longitudLista);
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