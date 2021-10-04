const genericError  = require('./responses/errors/genericError.js');
const genericResponse =require('./responses/genericResponse.js');
const signinRequest = require('./requests/signInRequest.js');
const createPost = require('./requests/create_post.js');
const express = require ('express');
const mysql = require('mysql')
const app = express();
const cors = require('cors');
const { response } = require('express');
const PORT = 5005;
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


}
let  db = null;
try{
db = new DataService();
}
catch(err){
console.log(err);
}



app.post('/CreateTimelineData' , (req, res) => {
    let result_array = new Array();
    createPost.email = req.body.email;
    createPost.content_value = req.body.content_value;
    createPost.post_text = req.body.post_text;
    let sql = `SELECT user_id FROM posts, user_auth WHERE posts.user_id = user_auth.id AND user_auth.email = '${createPost.email}'`
    db.execute(sql).then(resp => {
        if(resp.length>0){
            let user_id = resp[0].user_id;
            result_array = result_array.concat(resp);
            console.log(resp);
            // now we run the query to create post as we got our user_id
            let sql2 = `INSERT INTO posts (user_id,content_type, content_value,post_text,post_date) VALUES ('${user_id}','image','${createPost.content_value}', '${createPost.post_text}',CURDATE())`;
            db.execute(sql2).then(res => {
                console.log(res)
            })
        }
    });
    
})








app.listen(PORT, () => {
    console.log(`server listening at port:${PORT}`)
})