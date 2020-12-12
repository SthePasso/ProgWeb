const express = require("express");

function logger(tipo){
    if(tipo === "completo"){
        return function(req, res, next){
            console.log("Logs completos");
            next();
        }
    } else if(tipo ==="simples"){
        return function(req, res, next){
            console.log("Logs simples");
            next();
        }
    }
}
module.exports = logger;