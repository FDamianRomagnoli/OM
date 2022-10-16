let btnActivate = true;

export function startButtonHamburguer(nav, btnHam, opacity){

    btnHam.innerHTML = `
    <i></i>
    <i></i>
    <i></i>
    `

    const btnIcon = document.querySelectorAll(".mobile__button i");

    btnHam.addEventListener("click", () =>{
        if(btnActivate){
            nav.style.transitionTimingFunction = "ease-in-out";
            nav.style.right = "0px";
            transformX(btnIcon);
            opacity.style.display = "block";
        }
        else{
            nav.style.transitionTimingFunction = "ease-in";
            nav.style.right = "-400px";
            transformHam(btnIcon);
            opacity.style.display = "none";
        }

        btnActivate = !btnActivate;
    });

    opacity.addEventListener("click", () =>{
        if(!btnActivate){
            nav.style.transitionTimingFunction = "ease-in";
            nav.style.right = "-400px";
            transformHam(btnIcon);
            opacity.style.display = "none";
        }

        btnActivate = !btnActivate;
    });

}



function transformX(btnIcon){
    btnIcon[1].style.transition = "all 0s";

    btnIcon[0].style.transform = "translate(0, 15.4px) rotate(45deg)";
    btnIcon[1].style.transform = "rotateX(90deg)";
    btnIcon[2].style.transform = "translate(0, -12.4px) rotate(-45deg)";
}

function transformHam(btnIcon){
    btnIcon[1].style.transition = "all .2s";
    btnIcon[1].style.transitionTimingFunction = "step-end";

    btnIcon[0].style.transform = "none";
    btnIcon[1].style.transform = "none";
    btnIcon[2].style.transform = "none";
}
