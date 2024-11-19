const {sequelize} = require("../database/postgres.database");
const Customer = require("../models/customer.model");
const Model = require("../models/model.model");
const Reservation = require("../models/reservation.model");
const Vehicle = require("../models/vehicle.model");

const loadModels = async () => {
    Customer.hasMany(Reservation);
    Reservation.belongsTo(Customer);

    Model.hasMany(Vehicle);
    Vehicle.belongsTo(Model);

    Customer.hasMany(Reservation);
    Reservation.belongsTo(Customer);
    Reservation.belongsTo(Vehicle);
    Vehicle.hasMany(Reservation);

    await sequelize.sync({alter: true});
}

module.exports = loadModels;
