const genericError  = require('./responses/errors/genericError.js');
const genericResponse =require('./responses/genericResponse.js');

const express = require ('express');
const mysql = require('mysql')
const app = express();
const cors = require('cors');
const PORT = 5004;
app.use(express.json());
app.use(cors());

const db= mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'root',
    database:'facebook_clone',
    port:'10005'
})


//connect to sql
db.connect(err => {
    if(err){
        throw err
    }
    console.log('SQL connected')
})

app.get('/showposts' , (req, res) => {
    let sql = 'SELECT user_id,content_value,post_text,post_date FROM posts';
    let query = db.query(sql, (err, result)=>{
        if(err){
            res.status(503);
            genericError.status='503';
            genericError.error=err.stack;
            console.log(err.stack);
            res.send(genericError);
            return;
        }
        /*if(result.length==0 || result.length ==undefined || result[0].id==undefined){
            res.status(404);
            genericError.status= '404';
            genericError.error = 'email or password incorrect';
            console.log(genericError.error);
            res.send(genericError);     
            return;       
        }*/
        genericResponse.status='200';
        genericResponse.data = result;
        res.status(200)
        console.log(genericResponse);
        res.send(genericResponse);
    })
})








app.listen(PORT, () => {
    console.log(`server listening at port:${PORT}`)
})