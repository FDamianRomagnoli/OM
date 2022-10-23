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
                    idProduct : parseInt(id),
                    quantity: 1
                })
                this.saveData(data)
            }
            
            this.updateCounter()
        }
    }

    additionQuantity(id){

        let quantityValue = 1

        if(this.existsProduct(id)){
            let listData = this.getData()
            listData.forEach(element => {
                if(element.idProduct == id){
                    element.quantity = element.quantity + 1
                    quantityValue = element.quantity
                }
            });
            this.saveData(listData)
        }

        return quantityValue
        
    }

    subtractionQuantity(id){

        let quantityValue = 1

        if(this.existsProduct(id)){
            let listData = this.getData()
            listData.forEach(element => {
                if(element.idProduct == id && element.quantity > 1){
                    element.quantity = element.quantity - 1
                    quantityValue = element.quantity
                }
            });
            this.saveData(listData)
        }

        return quantityValue
        
    }

    existsProduct(id){
        return (this.getData().some((obj) => {
            return obj.idProduct == id
        }))
    }

    deleteProduct(id){
        if(this.storageAvailable('localStorage')){
            let data = this.getData()
            data = data.filter(product => {
                return product.idProduct != id
            })
            this.saveData(data)
            this.updateCounter()
        }
    }

    resetProduct(){
        if(this.storageAvailable('localStorage')){
            window.localStorage.setItem(this.key, '[]')
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
    
    getQuantity(id){
        return this.getData(id).find(e => e.idProduct == id).quantity
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

