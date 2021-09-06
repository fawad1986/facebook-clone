const signinRequest = require('./requests/signInRequest.js');
const genericError  = require('./responses/errors/genericError.js');
const genericResponse =require('./responses/genericResponse.js');

const express = require('express');
const mysql = require('mysql')
const app = express();
const PORT = 5000;
app.use(express.json());
//app.use(cors());

// create database connection
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

/* query to insert data into user_info
INSERT INTO user_info (first_name,last_name,date_of_birth,gender) VALUES ('Ammad','Hassan','1993-12-26','m')
*/

app.post('/newuser', (req,res) =>{
    signinRequest.first_name= req.body.first_name;
    signinRequest.last_name= req.body.last_name;
    signinRequest.date_of_birth= req.body.password;
    signinRequest.gender= req.body.gender;
    console.log(signinRequest);
    let sql = `INSERT INTO user_info (first_name,last_name,date_of_birth,gender) VALUES ('${signinRequest.first_name}','${signinRequest.last_name}','${signinRequest.date_of_birth}','${signinRequest.gender}')`;
    let query= db.query(sql, (err, result) => {
        if(err){
            res.status(503);
            genericError.status='503';
            genericError.error=err.stack;
            console.log(err.stack);
            res.send(genericError);
        }
        if(result.length==0 || result.length ==undefined || result[0].id==undefined){
            res.status(404);
            genericError.status= '404';
            genericError.error = 'email or password incorrect';
            console.log(genericError.error);
            res.send(genericError);            
        }
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