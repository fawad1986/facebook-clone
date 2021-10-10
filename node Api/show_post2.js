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
        this.response = {};
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

    setResponse(resp){
        this.response = resp;
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

    async executeAsync(sqlString){
        let result_array = new Array();
        let resp = await this.execute(sqlString);
        let user_id = {};
            if(resp.length>0){
            user_id = resp[0].user_id;
            result_array = result_array.concat(resp);
            console.log(resp);
            }
            let sql2 = `SELECT user2_id FROM friends,user_info WHERE friends.user1_id=user_info.id AND user_info.id ='${user_id}' `;
            resp = await this.execute(sql2);
            if(resp.length >0){
                for(let i=0;i<resp.length;i++)//for (let item of resp)
                {
                    let item = resp[i];
                    let sql3 = `SELECT profile_pic,first_name,user_id, content_value, post_text,post_date, email FROM posts , user_info, user_auth WHERE posts.user_id=user_info.id AND user_info.id=user_auth.id AND user_auth.id='${item.user2_id}'`;
                    let result2 = await this.execute(sql3);
                    result_array.push(result2);

                }
   
            genericResponse.status= '200';
            genericResponse.data= result_array;
            console.log(genericResponse);
            this.response.send(genericResponse);
                        
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
    db.setResponse(res);
    let result_array = new Array();
    signinRequest.email = req.body.email;

    let sql = `SELECT profile_pic,first_name,user_id, content_value, post_text,post_date, email FROM posts , user_info, user_auth WHERE posts.user_id=user_info.id AND user_info.id=user_auth.id AND user_auth.email='${signinRequest.email}'`;

    try{
        db.executeAsync(sql);

    /*
    db.execute(sql).then(resp =>{
        if(resp.length>0){
        let user_id = resp[0].user_id;
        result_array = result_array.concat(resp);
        console.log(resp);
        // next query
        let sql2 = `SELECT user2_id FROM friends,user_info WHERE friends.user1_id=user_info.id AND user_info.id ='${user_id}' `;
            db.execute(sql2).then(
                resp => {
                    if(resp.length >0){
                        let promiseArray = new Array();
                        resp.map (
                            item => {
                                let sql3 = `SELECT profile_pic,first_name,user_id, content_value, post_text,post_date, email FROM posts , user_info, user_auth WHERE posts.user_id=user_info.id AND user_info.id=user_auth.id AND user_auth.id='${item.user2_id}'`;
                                promiseArray.push( db.execute(sql3));
                            }
                            );
                            Promise.all(promiseArray).then(
                                result_arr => {
                                    result_arr.map(item => result_array = result_array.concat(item));
                                    genericResponse.status= '200';
                                    genericResponse.data= result_array;
                                    console.log(genericResponse);
                                    res.send(genericResponse);
                                }
                        )

                    }

                }
            );
        }


        
    });
*/
    }
    catch(err){
        console.log(err);
    }


})








app.listen(PORT, () => {
    console.log(`server listening at port:${PORT}`)
})