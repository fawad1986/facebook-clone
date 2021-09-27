const express = require ('express');
const mysql = require('mysql')
const app = express();
const cors = require('cors');
const PORT = 5000;
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

app.get('/CreateTimelineData' , (req, res) => {
    
})








app.listen(PORT, () => {
    console.log(`server listening at port:${PORT}`)
})