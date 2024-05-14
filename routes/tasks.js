const { DataTypes } = require('sequelize');
const sequelize = require('../Db-connection');
const User = require('./users');

const Task = sequelize.define('Task', {
  taskName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  taskType: {
    type: DataTypes.ENUM('Pending', 'Done'),
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
  }
  
});

Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;