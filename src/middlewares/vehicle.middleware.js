const {getVehicle} = require("../services/vehicle.service");

const checkVehicleExist = async (req, res, next) => {
    const { vehicleId } = req.params;
    const vehicle = await getVehicle(vehicleId);

    if (!vehicle) {
        return res.status(404).json({message: `vehicle '${vehicleId}' not found`});
    }

    req.vehicle = vehicle;
    next();
}

module.exports = checkVehicleExist;
