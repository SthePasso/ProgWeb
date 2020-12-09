
const http = require('http');
const fs = require('fs');
let directory_name = process.argv[2]; //get argv in index  
let filenames = fs.readdirSync(directory_name); 
//console.log(filenames);

const server = http.createServer(function (req, res){
    console.log(req.method);
    console.log(req.url);

    res.setHeader("Content-Type","text/plain; charset=utf-8")
    res.write(filenames.join("\n"));
    res.end();
});

server.listen(5000, function(){
    console.log("Escutando a porta 5000");
});  
//node index arquivos
