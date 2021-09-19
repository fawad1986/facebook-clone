const signUpRequest = require('./requests/signUpRequest.js');
const genericError  = require('./responses/errors/genericError.js');
const genericResponse =require('./responses/genericResponse.js');

const express = require('express');
const mysql = require('mysql')
const app = express();
const PORT = 5001;
const cors = require('cors');
app.use(express.json());
app.use(cors());

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
    signUpRequest.first_name= req.body.first_name;
    signUpRequest.last_name= req.body.last_name;
    signUpRequest.birthDay = req.body.birthDay;
    signUpRequest.birthMonth = req.body.birthMonth;
    signUpRequest.birthYear = req.body.birthYear;
  //  signUpRequest.date_of_birth= req.body.date_of_birth;
    signUpRequest.date_of_birth= signUpRequest.birthYear + '-' +signUpRequest.birthMonth + '-' +signUpRequest.birthDay;
    signUpRequest.gender= req.body.gender;
    console.log(signUpRequest);
    let sql = `INSERT INTO user_info (first_name,last_name,date_of_birth,gender) VALUES ('${signUpRequest.first_name}','${signUpRequest.last_name}','${signUpRequest.date_of_birth}','${signUpRequest.gender}')`;
    let query= db.query(sql, (err, result) => {
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