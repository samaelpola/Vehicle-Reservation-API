const Vehicle = require("../models/vehicle.model");
const {getModel} = require("./model.service");

const checkRegistrationAlreadyExist = async (vehicleRegistration) => {
    const vehicle = await Vehicle.findOne({
        where: {
            registration: vehicleRegistration
        }
    });

    return vehicle !== null;
}

const getVehicles = async () => {
    return await Vehicle.findAll({include: {all: true}});
}

const getVehicle = async (vehicleId) => {
    return await Vehicle.findByPk(vehicleId, {include: { all: true}});
}

const createVehicle = async (vehicle, model) => {
    const newVehicle = await Vehicle.create({
        registration: vehicle.registration
    });
    newVehicle.setModel(model);
    await newVehicle.save();

    return newVehicle;
}

const deleteVehicle = async (vehicle) => {
    await vehicle.destroy();
    return {"detail": "vehicle delete"};
}

const updateVehicle = async (vehicle, data, model) => {
    if (data.hasOwnProperty("registration")) {
        vehicle.registration = data.registration;
    }

    if (data.hasOwnProperty("modelId")) {
        vehicle.setModel(model);
    }

    await vehicle.save();
    return vehicle;
}


module.exports = {checkRegistrationAlreadyExist, createVehicle,deleteVehicle, getVehicle, getVehicles, updateVehicle};