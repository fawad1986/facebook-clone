export default class err_resp {
    constructor(){
        this.status = '';
        this.error = '';
    }
    getStatus(){
        return this.status;
    }
    setStatus(newStatus){
        this.status = newStatus;
    }
    getError(){
        return this.error;
    }
    setError(newError){
        this.error=newError
    }
}

//export default err_resp;