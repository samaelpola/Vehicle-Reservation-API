const express = require('express');
const {getReservations, createReservation, updateReservation, deleteReservation} = require("../services/reservation.service");
const reservationMiddleware = require("../middlewares/reservation.middleware");
const {checkSchema} = require("express-validator");
const {reservationValidationRules, reservationPatchValidationRules} = require("../schemas/reservation.schemas");
const validateSchema = require("../schemas/index");
const {AlreadyReservedError} = require("../errors/reservation.error");


const router = express.Router();

router.get("/", async (req, res) => {
    res.json(await getReservations());
});

router.get("/:reservationId", reservationMiddleware, (req, res) => {
    res.json(req.reservation);
});

router.post("/", checkSchema(reservationValidationRules), validateSchema, async (req, res) => {
    try {
        return res.status(201).json(await createReservation(req.body, req.customer, req.vehicle));
    } catch (e) {
        if (e instanceof AlreadyReservedError) {
            res.status(400).json({
                "detail": e.message
            });
        }
    }
});

router.patch("/:reservationId", checkSchema(reservationPatchValidationRules), validateSchema, reservationMiddleware, async (req, res) => {
     try {
        return res.json(await updateReservation(req.reservation, req.body, req.customer, req.vehicle));
    } catch (e) {
        if (e instanceof AlreadyReservedError) {
            res.status(400).json({
                "detail": e.message
            });
        }
    }
});

router.delete("/:reservationId", reservationMiddleware, async (req, res) => {
    res.json(await deleteReservation(req.reservation));
});

module.exports = router;