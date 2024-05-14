const {DataTypes} = require("sequelize")
const sequelize = require("../Db-connection")

const User = sequelize.define("User",{
    id: {
        type:DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'users',
    timestamps: false,
})

module.exports = User