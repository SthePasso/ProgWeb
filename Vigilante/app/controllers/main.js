function index (req, res){
    res.render("main/index", {
        titulo: "Vigilantes da Floresta",
        mostraTitulo: true,
        professores: [
            { nome: "David Fernandes", sala: 1638},
            { nome: "Eduardo Souto", sala: 1639},
            { nome: "Edleno Moura", sala: 1636},
        ],
        layout: 'main'
    });
}

function sobre (req, res){
    res.render("main/sobre");
}

function game (req, res){
    res.render("main/game");
}

function ui (req, res){
    res.render("main/ui");
}

module.exports = {index, sobre, ui, game};