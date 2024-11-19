const {sequelize, DataTypes} = require("../database/postgres.database");

const Vehicle = sequelize.define(
    'vehicles',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        registration: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        timestamps: false
    }
);

module.exports = Vehicle;
