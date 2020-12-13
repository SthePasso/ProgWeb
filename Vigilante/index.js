const express = require("express");
const handlebars = require("express-handlebars");
const router = require("./config/router");
const morgan = require("morgan");
const logger = require("./middlewares/logger");
const sass = require("node-sass-middleware");
const path = require("path");
const app = express();

app.engine("handlebars", handlebars({
    helpers: require(`${__dirname}/app/views/helpers`)
}));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/app/views`);
app.use(sass({
    src: `${__dirname}/public/scss`,
    dest: `${__dirname}/public/css`,
    outputStyle: 'compressed',
    prefix: '/css'
}));

app.use(express.static(path.join(__dirname,"public")));
app.use("/webfonts", express.static(`${__dirname}/node_modules/@fortawesome/fontawesome-free/webfonts`));

app.use("/js",[
    express.static(__dirname +'/node_modules/jquery/dist/'),
    express.static(__dirname +'/node_modules/popper.js/dist/umd'),
    express.static(__dirname +'/node_modules/bootstrap/dist/js')
])

//app.use(morgan("combined"));
app.use(logger("completo"));
app.use(express.urlencoded({ extended: false}));
app.use(router);

app.use(function(req, res, next){
    res.status(404);
    res.render('main/error',{title:"Página não encontrada"});
});
app.use(function(error, req, res, next){
    res.render('main/error',{title: error.message});
});

app.listen(5000, function(){
    console.log("Escutando na porta 5000!")
});