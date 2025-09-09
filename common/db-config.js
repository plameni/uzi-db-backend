const Sequelize = require('sequelize');

const sequelize = new Sequelize('uzi_property', 'root', 'root1234', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;