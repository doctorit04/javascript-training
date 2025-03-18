const Sequelize = require('sequelize');
const sequelize = require('./db');

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    fullname: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    }
}); 

module.exports = Users;