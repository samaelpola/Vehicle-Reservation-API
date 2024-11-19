const Vehicle = require("../models/vehicle.model");

const checkVehicleExist = async (req, res, next) => {
    const { vehicleId } = req.params;
    const vehicle = await Vehicle.findByPk(vehicleId, {include: { all: true}});

    if (!vehicle) {
        res.status(404).json({message: `vehicle '${vehicleId}' not found`})
    }

    req.vehicle = vehicle;
    next();
}

module.exports = checkVehicleExist;
