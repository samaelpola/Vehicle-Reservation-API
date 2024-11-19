const {sequelize, DataTypes} = require("../database/postgres.database");

const Reservation = sequelize.define(
    'reservations',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

module.exports = Reservation;
