const mysql = require('mysql2');
const http = require('http');


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "chat"
});
const server = http.createServer((req,res) =>{
    if(req.url =="/message"){
        'SELECT * FROM message',
        function(err,result,fields){
        let html = '<html><body><ul>';
        result.array.forEach(element => {
            html += `<li>${element.content}</li>`
        });
        html += '</ul><form action = "/add" method = "POST"><input type = "text" name ="cont"></form></body></html>'
        res.writeHead (200, ('Content-type','text/html'));
        res.end (html);
    }
 } else if(req.url === "/add"&& req.method ==="POST"){
        let data = " ";
        req.on('data', function(chunk){
            data+= chunk;
        })
        req.on('end', function(){
            let sp = new URLSearchParams(data);
            let content = sp.get(content);
            connection.query(
            'INSERT INTO messages(content, userId,dialogId) VALUES("${content}",1,1);',
            function(err,result,fields){
                res.writeHead(302,{'location': '/messages'})
                res.end();
           
            }
        )})
    }})


// connection.query(
//     'SELECT * FROM user',
//     function(err,result,fields){
//         res.setHeader('Content-type', 'text/html');
//         res.write(`<${JSON.stringify(result)}`, 'utf-8');
//         res.end(result);
//     }
// )
// })
server.listen(3000);