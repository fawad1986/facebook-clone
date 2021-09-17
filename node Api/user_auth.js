const signinRequest = require('./requests/signInRequest.js');
const genericError  = require('./responses/errors/genericError.js');
const genericResponse =require('./responses/genericResponse.js');

const express = require('express');
const mysql = require('mysql')
const app = express();
const PORT = 5000;
const cors  = require('cors');
//var bodyParser = require('body-parser')
app.use(express.json());
app.use(cors());
//app.use(express.json());
//app.use(cors());

/*
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
*/

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

app.post('/usersignin', (req,res) =>{
    signinRequest.email= req.body.email;
    signinRequest.password= req.body.password;
    console.log(signinRequest);
    let sql = `SELECT id FROM user_auth where email='${signinRequest.email}' AND password='${signinRequest.password}'`;
    let query= db.query(sql, (err, result) => {
        if(err){
            res.status(503);
            genericError.status='503';
            genericError.error=err.stack;
            console.log(err.stack);
            res.send(genericError);
            return;
        }
        if(result.length==0 || result.length ==undefined || result[0].id==undefined){
            res.status(404);
            genericError.status= '404';
            genericError.error = 'email or password incorrect';
            console.log(genericError.error);
            res.send(genericError);
            return;            
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