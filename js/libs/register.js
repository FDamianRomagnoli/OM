// let buttonRegister = document.getElementById("btnregister")
// let email = "fdamianromagnoli@gmail.com"


// buttonRegister.addEventListener('click', () => {
//     fetch('https://open.kickbox.com/v1/disposable/mailinator.com')
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// })


var nombre = document.getElementById ("name");
var email =document.getElementById("email");
var tel =document.getElementById("tel");
var user =document.getElementById("user");
var pass =document.getElementById("pass");
var rPass =document.getElementById("r-pass");
var correoTemporal = false


var btnRegistrarse = document.getElementById("btnregister");
var error = document.getElementById("error");
var existe =false;

nombre.addEventListener('blur',validarNombre);
email.addEventListener('blur',validarEmail);
tel.addEventListener('blur',validarTel);
user.addEventListener('blur',validarUser);
pass.addEventListener('blur',validarPass);
rPass.addEventListener('blur',validarPassIguales);

btnRegistrarse.addEventListener('click',validar);

function validarNombre(evento){
    evento.preventDefault();
        if (nombre.value===''){
            error.innerHTML="Debe ingresar un nombre";
            return false;
            
        }else {
            error.innerHTML="";
            return true;
        }
}
function validarPass(evento){
    evento.preventDefault();
        if (pass.value===''){
            error.innerHTML="Debe ingresar una contraseña";
            return false;
            
        }else {
            error.innerHTML="";
            return true;
        }
}
function validarPassIguales(evento){
    evento.preventDefault();
        if ((pass.value==='') || (rPass.value==='')){
            error.innerHTML="Debe ingresar o reingresar una contraseña";
            return false;
		}else if(!(pass.value===rPass.value)){	
			error.innerHTML="Las contraseñas no coinciden";
            return false;
            
        }else {
            error.innerHTML="";
            return true;
        }
}
function validarPassIguales2(pass1,pass2){
    
        if ((pass1==='') || (pass2==='')){
            error.innerHTML="Debe ingresar o reingresar una contraseña";
            return false;
		}else if(!(pass1===pass2)){	
			error.innerHTML="Las contraseñas no coinciden";
            return false;
            
        }else {
            error.innerHTML="";
            return true;
        }
}
function validarUser(evento){
    evento.preventDefault();
        if (user.value===''){
            error.innerHTML="Debe ingresar un nombre de usuario";
            return false;
            
        }else {
            error.innerHTML="";
            return true;
        }
}
function validarTel(evento){
    evento.preventDefault();
	let regex = /^\+54\d{8,10}$/;
        if (tel.value===''){
            error.innerHTML="Debe ingresar un telefono";
            return false;
		}else if(!regex.test(tel.value)){
			error.innerHTML="El telefono ingresado no es valido";
        	return false


        }else {
            error.innerHTML="";
            return true;
        }
}
function validarEmail(evento){
     evento.preventDefault();
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (email.value === ''){
        
        error.innerHTML="Debe ingresar un email";
        return false;
    }else if (!emailRegex.test(email.value)){
      
        error.innerHTML="El email ingresado no es valido";
        return false
    }else {
        error.innerHTML="";
        return true;
    }
}
function validarEmail2(email){
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
   if (!emailRegex.test(email)){
        error.innerHTML="El email ingresado no es valido";
        return false
    }else {
        error.innerHTML="";
        return true;
    }
}

function validar(evento){
    console.log(existe)
    evento.preventDefault();
    if (!(email.value==='') && !(nombre.value==='') && !(tel.value==='') && !(user.value==='') && !(pass.value==='') && !(rPass.value==='')){
    if(validarEmail2(email.value) && (validarPassIguales2(pass.value, rPass.value))){
             existe=true;
        }
    }

    
    esCorreoTemporal(email.value)

    if (existe && !correoTemporal ){
       
        modal('miventana',{
        title: 'Mensaje',
        width: 300,
        height: 10,
        content: 'El usuario se registro exitosamente'},
        ['Aceptar',function(){
        document.location.href='index.html';
        }]);
    }else {
        error.innerHTML="Debe completar todos los campos";
        console.log(existe)
    }
}



function esCorreoTemporal(correo){
    fetch(`https://open.kickbox.com/v1/disposable/${correo}`)

    .then(res => res.json())

    .then(resultado => {
        correoTemporal = resultado["disposable"]
    })
}


function modal(id, data, ok) {
    data=data || {};
    id="modal-"+id;
    if (document.getElementById(id)==null) {
        var d=document.createElement("div");
        d.className="modal";
        d.id=id;
        var p=document.createElement("div");
        p.className="panel";
        var t=document.createElement("div");
        t.className="title";

        var ct=document.createElement("div");
        ct.className="content";
        p.appendChild(t);

        p.appendChild(ct);
        d.appendChild(p);
        document.body.appendChild(d);
    }
    var mod=document.getElementById(id),
    p=mod.querySelector(".panel"),
    t=mod.querySelector(".panel .title"),
    ct=mod.querySelector(".panel .content")

    t.innerHTML=data.title || '';
    ct.innerHTML=data.content || '';

    if (!isNaN(data.width)) p.style.maxWidth=data.width+'px';
    if (!isNaN(data.height)) p.style.maxHeight=data.height+'vh';
    if (ok && ok.length>1) {
        var param={value:null};


        var bOk=document.createElement("button");
        bOk.className="action";
        bOk.className="btnAceptar";
        bOk.innerHTML=ok[0];
        bOk.addEventListener('click',function(ev) {
        ev.preventDefault();
        mod.classList.remove("visible");
        ok[1](param.value);
        });
        ct.appendChild(bOk);
    }

    setTimeout(function(){
        mod.classList.add("visible");
    },50);
}



const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = 0;
  this.style.height = (this.scrollHeight) + "px";
}