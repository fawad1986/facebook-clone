const express = require('express');
const mysql = require('mysql')
const app = express();
const PORT = 5000;


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

app.get('/usersignin', (req,res) =>{
    let sql = 'SELECT * FROM user_info';
    let query= db.query(sql, (err, result) => {
        if(err){
            throw err
        }
        console.log(result);
        res.send(result);
    })
})

// adding new user
app.post('/newuser', (req,res) => {
    let post= {id:`${req.body.id}`, email:`${req.body.email}`, password:`${req.body.password}`}
    console.log(post);
    let sql = 'INSERT INTO user_info SET ?';
    let query = db.query(sql,post, err => {
        if(err){
            throw err
        }
        res.send('User Added')
    })

})

app.listen(PORT, () => {
    console.log(`server listening at port:${PORT}`)
})