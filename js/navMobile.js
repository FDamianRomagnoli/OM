const nav = document.querySelector(".nav__mobile");
const btnHam = document.querySelector(".mobile__button");
const opacity = document.querySelector(".nav__opacity");

btnHam.innerHTML = `
    <i></i>
    <i></i>
    <i></i>
`;
const btnIcon = document.querySelectorAll(".mobile__button i");
let btnActivate = true;

function main(){

    btnHam.addEventListener("click", () =>{
        if(btnActivate){
            nav.style.transitionTimingFunction = "ease-in-out";
            nav.style.right = "0px";
            transformX();
            opacity.style.display = "block";
        }
        else{
            nav.style.transitionTimingFunction = "ease-in";
            nav.style.right = "-400px";
            transformHam();
            opacity.style.display = "none";
        }

        btnActivate = !btnActivate;
    });

    opacity.addEventListener("click", () =>{
        if(!btnActivate){
            nav.style.transitionTimingFunction = "ease-in";
            nav.style.right = "-400px";
            transformHam();
            opacity.style.display = "none";
        }

        btnActivate = !btnActivate;
    });

}



function transformX(){
    btnIcon[1].style.transition = "all 0s";

    btnIcon[0].style.transform = "translate(0, 15.4px) rotate(45deg)";
    btnIcon[1].style.transform = "rotateX(90deg)";
    btnIcon[2].style.transform = "translate(0, -12.4px) rotate(-45deg)";
}

function transformHam(){
    btnIcon[1].style.transition = "all .2s";
    btnIcon[1].style.transitionTimingFunction = "step-end";

    btnIcon[0].style.transform = "none";
    btnIcon[1].style.transform = "none";
    btnIcon[2].style.transform = "none";
}


main();