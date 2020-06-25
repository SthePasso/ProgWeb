const expres = require('express')
const app = expres()

app.get('/', function(req, res) {
    res.sendFile( __dirname + '/index.html');
    //res.send('Hello World');
});

app.use('/public', expres.static(__dirname + '/public'))

app.listen(8000);
