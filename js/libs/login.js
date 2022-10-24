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
                               
                existe=true;
                
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
       
            modal('miventana',{
            title: 'Mensaje',
            width: 300,
            height: 10,
            content: 'Ingreso correctamente'},
            ['Aceptar',function(){
            document.location.href='products.html';
            }]);
        }else {
            error.innerHTML="El usuario y la contraseña no existen";
            usuario.value=""
            pass.value=""
        }

        })
    }       

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


