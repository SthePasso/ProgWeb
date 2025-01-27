const models = require("../models/index");
const Area = models.Area;
const Op = models.Sequelize.Op;

async function index(req, res){
    const areas = await Area.findAll();
    //areas.forEach(area => console.log(area.toJSON()));
    res.render("area/index",{
        areas: areas.map(area => area.toJSON())
    })
}
module.exports = { index }