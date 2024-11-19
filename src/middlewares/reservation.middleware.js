const Reservation = require("../models/reservation.model");

const checkReservationExist = async (req, res, next) => {
    const { reservationId } = req.params;
    const reservation = await Reservation.findByPk(reservationId, {include: { all: true}});

    if (!reservation) {
        res.status(404).json({message: `reservation '${reservationId}' not found`})
    }

    req.reservation = reservation;
    next();
}

module.exports = checkReservationExist;
