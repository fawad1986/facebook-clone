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

app.post('/newuser', (req,res) =>{
    signUpRequest.first_name= req.body.first_name;
    signUpRequest.last_name= req.body.last_name;
    signUpRequest.birthDay = req.body.birthDay;
    signUpRequest.birthMonth = req.body.birthMonth;
    signUpRequest.birthYear = req.body.birthYear;
    signUpRequest.date_of_birth= signUpRequest.birthYear + '-' +signUpRequest.birthMonth + '-' +signUpRequest.birthDay;
    signUpRequest.gender= req.body.gender;
    signUpRequest.email= req.body.email;
    signUpRequest.password= req.body.password;
    console.log(signUpRequest);

    //sign in error take id and posts
            let sqlQuery = `SELECT * FROM user_auth WHERE email = '${signUpRequest.email}'`; 
             let connection = db.query(sqlQuery, function(error, results){ 
            // There was an issue with the query 
            if(error){ 
                throw error; 
                return; 
            } 
        
            if(!results.length){ 
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
                    
                    genericResponse.status='200';
                    genericResponse.data = result;
                    res.status(200)
                    console.log(genericResponse);
                    res.send(genericResponse);
                    let sql2 = `INSERT INTO user_auth (id,email,password) VALUES ('${result.insertId}','${signUpRequest.email}','${signUpRequest.password}')`;
                    let query2= db.query(sql2, (err, result) => {
                        if(err){
                           throw err
                        }
                    })
                })
                
            }else{ 
                // The username wasn't found in the database 
                console.log(error);
            } 
        });


})

app.listen(PORT, () => {
    console.log(`server listening at port:${PORT}`)
})