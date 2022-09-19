const contenedor = document.querySelector('.page');

const btnAtras = contenedor.children[0];
const btnSiguiente = contenedor.children[2];
const displayContador = contenedor.children[1];

function main(){
    pageSelection.displayContador.innerHTML = pageSelection.contador;
    actualizarBotones();
}

let pageSelection = {
    contenedor : contenedor,
    btnAtras : contenedor.children[0],
    btnSiguiente : contenedor.children[2],
    displayContador : contenedor.children[1],
    contador : 1,
    maximo : 10
};


pageSelection.btnAtras.addEventListener("click",() =>{
    redireccionarArriba(1);
    modificarContador(pageSelection.contador - 1);
    actualizarBotones();
})

pageSelection.btnSiguiente.addEventListener("click",() =>{
    redireccionarArriba(pageSelection.maximo);
    modificarContador(pageSelection.contador + 1);
    actualizarBotones();
})

function limpiarSelector(){
    pageSelection.contador = 1;
    pageSelection.displayContador.innerHTML = pageSelection.contador;
    actualizarBotones();
}

function actualizarBotones(){
    if(pageSelection.maximo == 1){
        bloquearBtn(btnAtras);
        bloquearBtn(btnSiguiente);
    }else if(pageSelection.contador == 1){
        bloquearBtn(btnAtras);
        desbloquearBtn(btnSiguiente);
    }else{
        desbloquearBtn(btnAtras);
    }

    if(pageSelection.contador == pageSelection.maximo){
        bloquearBtn(btnSiguiente);
    }
}

function modificarContador(nuevoValor){
    pageSelection.contador = nuevoValor > pageSelection.maximo ? pageSelection.maximo : nuevoValor;
    pageSelection.contador = nuevoValor <= 1? 1 : pageSelection.contador;
    pageSelection.displayContador.innerHTML = pageSelection.contador;
}

function redireccionarArriba(pagina){
    if(pageSelection.contador != pagina){
        location.href = "#main";
        return true;
    }
    return false;
}

function bloquearBtn(btn){
    btn.style.color = "#AAA";
    btn.disabled = true;
}

function desbloquearBtn(btn){
    btn.style.color = "#000";
    btn.disabled = false;
}



main();
