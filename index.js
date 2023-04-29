const mysql = require('mysql2');
const http = require('http');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "chat"
});
const server = http.createServer((req,res) =>{
connection.query(
    'SELECT * FROM user',
    function(err,result,fields){
        console.log(result);
        res.end(result);
    }
)
})
server.listen(port)