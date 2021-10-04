

export default class DataService{

    
    constructor(){
        const mysql = require('mysql');
        this.QueryResult ={};
        this.ErrorObject= {};
        this.DBCon = mysql.createConnection({
            host: 'localhost',
            user:'root',
            password:'root',
            database:'facebook_clone',
            port:'10005'
        });
        this.DBCon.connect(err => {
            if(err){
                throw err
            }
            console.log('SQL connected')
        })
    }

    
    execute(sqlString){
        let query = this.DBCon.query(sqlString,(err, result)=>{
            if(err){
                this.ErrorObject.status = '503';
                this.ErrorObject.error = err.stack
                console.log(err.stack);
                throw this.ErrorObject;
            }
            this.QueryResult = result;
            return this.QueryResult 
        })

    }
}