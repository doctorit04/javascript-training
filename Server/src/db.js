const Sequelize = require('sequelize');

//load environment variables
const dotenv = require('dotenv');
dotenv.config();

// define the connection to the database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

//sync the database
sequelize.sync({ force: false })
.then(() => {
    console.log('Database synchronized');
})
.catch((error) => {
    console.error('Failed to synchronize database:', error);
});

//export the connection
module.exports = sequelize;