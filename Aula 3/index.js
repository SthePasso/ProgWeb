const expres = require('express')
const app = expres()

app.get('/', function(req, res) {
    res.sendFile( __dirname + '/exercice.html');
});

app.use('/public', expres.static(__dirname + '/public'))

app.listen(8000);
