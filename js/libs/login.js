const userDefault="admin@admin.com";
const passDefault="admin";
var usuario = document.getElementById ("user");
var pass =document.getElementById("pass");
var btnIngresar = document.getElementById("btningresar");
var error = document.getElementById("error");
var existe =false;

usuario.addEventListener('blur',validarUsuario)
pass.addEventListener('blur',validarPass)
btnIngresar.addEventListener('click',validar);

function buscarUsuario(us,pas){    
    fetch('./json/user.json')
    .then(response => {return response.json()})
    .then(userJson => {
        for (let i in userJson){
            if (userJson[i].user===us && userJson[i].pass===pas){
                console.log("entre")                
                existe=true;
                console.log ("valor de existe: "+ existe)
            } 
        }
        })
    console.log ("valor de existe: "+ existe)
    }

function validarUsuario(evento){
    evento.preventDefault();
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (usuario.value === ''){
        error.innerHTML="Debe ingresar un email";
        return false;
    }else if (!emailRegex.test(usuario.value)){
        error.innerHTML="El email ingresado no es valido";
        return false
    }else {
        error.innerHTML="";
        return true;

    }
}
function validarPass(evento){
    evento.preventDefault();
    if (pass.value===''){
        error.innerHTML="Debe ingresar la contraseña";
        return false;
    }else {
        error.innerHTML="";
        return true;
    }
}
function validar(evento){
    if (validarUsuario && validarPass){
        evento.preventDefault();
    fetch('./json/user.json')
    .then(response => {return response.json()})
    .then(userJson => {
        for (let i in userJson){
            if (userJson[i].user===usuario.value && userJson[i].pass===pass.value){                              
                existe=true;                
            } 
        }
        if (existe){            
            document.location.href='user.html';
        } else{            
            error.innerHTML="El usuario y la contraseña no existen";
            usuario.value=""
            pass.value=""
        }
        })
    }   
    }


