

var Sequelize = require('sequelize');
let db={};
const sequelize = new Sequelize('postgres://postgres:strelok@localhost:5432/postgres');

db.Sequelize=Sequelize;
db.sequelize=sequelize;

module.exports = db;