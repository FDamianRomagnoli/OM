export class CounterPage{

    constructor(btnNext, btnBack, displayCount){
        this.page = 1
        this.maxPage = 1
        this.btnNext = btnNext
        this.btnBack = btnBack
        this.displayCount = document.querySelector(displayCount)
        this.start()
    }


    start(){
        this.btnNext.addEventListener('click', () => this.nextPage())
        this.btnBack.addEventListener('click', () => this.backPage())
        this.refresh(this.maxPage)
    }

    reset(){
        this.page = 1
    }

    refresh(maxPage){
        this.maxPage = maxPage
        this.updateDisplayCount()
        this.buttonView()
    }

    setMaxPageOfResults(results){
        this.maxPage = Math.trunc((results / 10)) + 1;
        this.updateDisplayCount()
    }

    getPage(){
        return this.page;
    }


    nextPage(){
        this.page = this.page + 1
        this.updateDisplayCount()
    }

    backPage(){
        this.page = this.page - 1
        this.updateDisplayCount()
    }

    updateDisplayCount(){
        setTimeout(() => {
            scrollTo({top: 0})
            this.displayCount.innerHTML = this.page
            this.buttonView()
        },330)
    }

    buttonView(){

        if(this.page === 1){
            bloquearBtn(this.btnBack)
        }else{
            desbloquearBtn(this.btnBack)
        }


        if(this.page === this.maxPage){
            bloquearBtn(this.btnNext)
        }else{
            desbloquearBtn(this.btnNext)
        }

    }

}


function bloquearBtn(btn){
    btn.style.color = "#AAA";
    btn.disabled = true;
}

function desbloquearBtn(btn){
    btn.style.color = "#000";
    btn.disabled = false;
}


