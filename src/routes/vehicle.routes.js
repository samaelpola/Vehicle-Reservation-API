const express = require('express');
const {getVehicles, createVehicle, updateVehicle, deleteVehicle} = require("../services/vehicle.service");
const vehicleMiddleware = require("../middlewares/vehicle.middleware");
const {checkSchema} = require("express-validator");
const {vehicleValidationRules, vehiclePatchValidationRules} = require("../schemas/vehicle.schemas");
const validateSchema = require("../schemas");

const router = express.Router();

router.get("/", async (req, res) => {
    res.json(await getVehicles());
});

router.get("/:vehicleId", vehicleMiddleware, (req, res) => {
    res.json(req.vehicle);
});

router.post("/", checkSchema(vehicleValidationRules), validateSchema, async (req, res) => {
    return res.status(201).json(await createVehicle(req.body, req.model));
});

router.patch("/:vehicleId", checkSchema(vehiclePatchValidationRules), validateSchema, vehicleMiddleware, async (req, res) => {
    return res.json(await updateVehicle(req.vehicle, req.body, req.model));
});

router.delete("/:vehicleId", vehicleMiddleware, async (req, res) => {
    res.json(await deleteVehicle(req.vehicle));
});

module.exports = router;
