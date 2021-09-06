const mysql = require('mysql');
const db= mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'root',
    database:'facebook_clone',
    port:'10005'
})
db.connect(err => {
    if(err){
        throw err
    }
    console.log('SQL connected')
})
//export default db;