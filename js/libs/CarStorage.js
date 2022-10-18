export class CarStorage{

    constructor(counterContainer, key){
        this.counterElement = counterContainer
        this.key = key
    }

    updateCounter(){
        if(this.storageAvailable('localStorage')){
            this.counterElement.innerHTML = this.getData() == null ? 0 : this.getData().length
        }
    }

    addProduct(id){
        if(this.storageAvailable('localStorage')){
            if(this.existsProduct(id) == false){
                let data = this.getData()
                data.push({
                    idProduct : id,
                    quantity: 1
                })
                this.saveData(data)
            }
            
            this.updateCounter()
            console.log(this.getData())
        }
    }

    existsProduct(id){
        return (this.getData().some((obj) => {
            return obj.idProduct == id
        }))
    }

    deleteProduct(id){
        if(this.storageAvailable('localStorage')){
            let data = this.getData()
            data = data.filter((idProduct) => {
                return idProduct != id
            })
            this.saveData(data)
            this.updateCounter()
        }
    }


    getData(){
        let data = JSON.parse(window.localStorage.getItem(this.key))
        return data == null ? [] : data
    }

    saveData(data){
        window.localStorage.setItem(this.key, JSON.stringify(data))
    }
    


    
    storageAvailable(type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage.length !== 0;
        }
    }

}

