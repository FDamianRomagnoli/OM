


export function sliderRun(){

    const carousels = document.querySelectorAll('.Carousel-container')
    const style = document.createElement("style")
    style.innerHTML = ``
    let maxHeight = 0;
    let widthCarrousel = document.body.clientWidth > 1300 ? "100vw" : "1300px"

    Array.from(carousels).forEach( (carousel,index) => {
        maxHeight = getMaxContainer(carousel.children)
        const container = document.createElement("div")
        container.className = `Carousel-main${index}`
        setElementsContainer(container, carousel)
        carousel.innerHTML = ""
        carousel.appendChild(container)
        style.innerHTML = style.innerHTML + setStylesCarousel(index,maxHeight,widthCarrousel)
    })

    style.innerHTML = style.innerHTML + `
    
        .Carousel-container{
            width: 100%;
            overflow: hidden;
            height: auto;
            display: flex;
            
        }
        .Carousel-item{
            transition: all 1s;
        }

        .Carousel-item:hover{
            transform: scale(1.05);
        }
        .Carousel-items{
            padding: 20px 0px;
            position: absolute;
            display: flex;
            justify-content: space-around;
            align-items: center;
            min-width: ${widthCarrousel};
            animation: transitionA ${document.body.clientWidth < 600 ? "10" : "12"}s linear infinite; 
        }
        
        @keyframes transitionA {
            0%{
                transform:  translate(0,0);
            }
            100%{
                transform: translate(${widthCarrousel},0);
            }
        }
    
    `

    document.getElementsByTagName("head")[0].appendChild(style)
}

function getMaxContainer(children){
    let maxHeight = 0

    Array.from(children).forEach(node => {
        maxHeight = maxHeight >= node.clientHeight ? maxHeight : node.clientHeight
    })

    return maxHeight
}

function setStylesCarousel(index,height,widthCarrousel){
    return `
    .Carousel-main${index}{
        display: flex;
        position: relative;
        height: ${height + 40}px;
        width: 100%;
    }
    .Carousel-items:nth-child(2){
        left: calc( -${widthCarrousel} + 1px );
    }
    `
    
    
}

function setElementsContainer(container, carousel){
    const carouselOne = carousel.cloneNode(true)
    const carouselTwo = carousel.cloneNode(true)
    carouselOne.className = "Carousel-items"
    carouselTwo.className = "Carousel-items"
    container.appendChild(carouselOne)
    container.appendChild(carouselTwo)
}


// document.onload = main();
