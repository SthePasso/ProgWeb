const http = require('http');
const fs = require('fs');
const strHelpers = require('./str_helper');

const server = http.createServer(function (req, res){
    console.log(req.method);
    console.log(req.url);
    if(req.url==='/page1'){
        fs.readFile('./page1.html', function(error, content){
            res.write(content);
            res.end();
        })
    } else if(req.url === '/favicon.ico') {
        res.write('Eis o favicon');
        res.end();
    } else{
        res.setHeader("Content-Type","text/html; charset=utf-8")
        res.write(strHelpers.upper("Instituto de Computação"));
        res.end();
    }
    //nodemon .
});

server.listen("3000", function(){
    console.log("Escutando a porta 3000");
});
//npm example_0.js