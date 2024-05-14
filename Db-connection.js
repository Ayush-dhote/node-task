const Sequelize= require("sequelize")


const sequelize=new Sequelize("sequelize_database","root","Localhost@3000",{
    dialect: "mysql",
    host: '',
    logging: false
})

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize