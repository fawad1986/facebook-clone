export default class  generic_resp  {
    constructor(){
        this.status = '';
        this.data = '';
    }
    getStatus(){
        return this.status;
    }
    setStatus(newStatus){
        this.status = newStatus;
    }
    getData(){
        return this.data;
    }
    setData(NewData){
        this.data = NewData;
    }
    }
    
    //export default generic_resp;