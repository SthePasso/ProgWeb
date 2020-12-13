const models = require("../models/index")
const Curso = models.Curso;

async function index(req, res) {
    const cursos = await Curso.findAll({raw:true});
    res.render("curso/index",{
        //cursos:cursos.map(curso => curso.toJSON())
        cursos,
    });
}
async function create(req, res) {
    if(req.route.methods.get){
        res.render("curso/create");
    } else {
        try{
            await Curso.create({
                sigla: req.body.sigla,
                nome: req.body.nome,
                descricao: req.body.descricao,
                areaId: req.body.areaId
            })
            res.redirect("/curso");
        } catch(errors){
            console.error(errors);
            res.render("curso/create",{
                curso: req.body,
                errors: errors
            });
        }
    }
}
async function read(req, res, next) {
    const curso = await Curso.findByPk(req.params.id, {
        include: models.Area
    });
    if(!curso){
        return next();
    }
    console.log(curso.dataValues.Area.nome);
    res.render("curso/read", {
        curso: curso.dataValues
    })
}
async function update(req, res, next) {
    const curso = await Curso.findByPk(req.params.id,{raw:true});
    if(!curso){
        return next();
    }
    if (req.route.methods.get){
        res.render("curso/update",{
            curso
        })
    } else{
        try{
            await Curso.update({
                sigla: req.body.sigla,
                nome: req.body.nome,
                descricao: req.body.descricao,
                areaId: req.body.areaId,
            }, {where:{id:req.params.id}});
            res.redirect("/curso/"+ req.params.id); 
        } catch(errors){
            res.render("curso/update",{
                curso: req.body,
                errors: errors
            });
        }
    }
}
async function remove(req, res) {
    const curso = await Curso.findOne({where:{id:req.params.id}});
    await curso.destroy();
    res.redirect("/curso");
}

module.exports = { index, create, read, update, remove }