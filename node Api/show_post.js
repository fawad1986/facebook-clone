const genericError  = require('./responses/errors/genericError.js');
const genericResponse =require('./responses/genericResponse.js');
const signinRequest = require('./requests/signInRequest.js');
//const DataService = require('./services/dataService');
const express = require ('express');
const mysql = require('mysql')
const app = express();
const cors = require('cors');
const PORT = 5004;
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






app.post('/showposts' , (req, res) => {

    let result_array = new Array();
    signinRequest.email = req.body.email;

    let sql = `SELECT profile_pic,first_name,user_id, content_value, post_text,post_date, email FROM posts , user_info, user_auth WHERE posts.user_id=user_info.id AND user_info.id=user_auth.id AND user_auth.email='${signinRequest.email}'`;
    try{
    db.execute(sql).then(resp =>{
        if(resp.length>0){
        let user_id = resp[0].user_id;
        result_array = result_array.concat(resp);
        console.log(resp);
        // next query             
        
                    let sql2 = `SELECT profile_pic,first_name,user_id, content_value, post_text,post_date, email FROM posts , user_info, user_auth WHERE posts.user_id=user_info.id AND user_info.id=user_auth.id AND user_auth.id IN (SELECT user2_id FROM friends,user_info WHERE friends.user1_id=user_info.id AND user_info.id ='${user_id}')`;
                   db.execute(sql2).then(
                result_arr => {
                    //result_arr.map(item => result_array = result_array.concat(item));
                    result_array = result_array.concat( result_arr);
                    genericResponse.status= '200';
                    genericResponse.data= result_array;
                    console.log(genericResponse);
                    res.send(genericResponse);
                }
            )                           
        }        
    });

    }
    catch(err){
        console.log(err);
    }
})


// app.post('/showposts' , (req, res) => {

//     let result_array = new Array();
//     signinRequest.id = req.body.id;

//     let sql = `SELECT profile_pic,first_name,user_id, content_value, post_text,post_date, email FROM posts , user_info, user_auth WHERE posts.user_id=user_info.id AND user_info.id=user_auth.id AND user_auth.id= '${signinRequest.id }' UNION SELECT profile_pic,first_name,user_id, content_value, post_text,post_date, email FROM posts , user_info, user_auth WHERE posts.user_id=user_info.id AND user_info.id=user_auth.id AND user_auth.id IN (SELECT user2_id FROM friends,user_info WHERE friends.user1_id=user_info.id AND user_info.id ='${signinRequest.id }')`;
//     try{
//     db.execute(sql).then(resp =>{
        
        
//         result_array = result_array.concat(resp);
//         console.log(resp);
//         // next query             
//                     // result_array = result_array.concat( result_arr);
//                     genericResponse.status= '200';
//                     genericResponse.data= result_array;
//                     console.log(result_array)
//                     console.log(genericResponse);
//                     res.send(genericResponse);
                                           
               
//     });

//     }
//     catch(err){
//         console.log(err);
//     }
// })




app.listen(PORT, () => {
    console.log(`server listening at port:${PORT}`)
})