const genericError  = require('./responses/errors/genericError.js');
const genericResponse =require('./responses/genericResponse.js');
const signinRequest = require('./requests/signInRequest.js');
//const DataService = require('./services/dataService');
const express = require ('express');
const mysql = require('mysql')
const app = express();
const cors = require('cors');
const PORT = 5007;
app.use(express.json());
app.use(cors());

class DataService{


    constructor(){
        //const mysql = require('mysql');
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

    execute(sqlString)
    {
        try{
             return new Promise((resolve, reject)=>{
                this.DBCon.query(sqlString,  (error, results)=>{
                    if(error){
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        }
        catch(err){
            throw err;
        }


    }


}
let  db = null;
try{
db = new DataService();
}
catch(err){
console.log(err);
}






app.post('/searchFriend' , (req, res) => {

    signinRequest.first_name = req.body.first_name;
    let result_array = new Array();
    let sql = `SELECT id,first_name, profile_pic FROM user_info WHERE first_name = '${signinRequest.first_name}'`;
    try{
    db.execute(sql).then(resp =>{
        if(resp.length>0){
        result_array = result_array.concat(resp);
        console.log(resp);
                        
        
            genericResponse.status= '200';
            genericResponse.data= result_array;
            console.log(genericResponse);
            res.send(genericResponse);
                                           
        }        
    });

    }
    catch(err){
        console.log(err);
    }
})



app.listen(PORT, () => {
    console.log(`server listening at port:${PORT}`)
})