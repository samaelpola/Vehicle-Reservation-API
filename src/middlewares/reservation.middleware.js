const {getReservation} = require("../services/reservation.service");

const checkReservationExist = async (req, res, next) => {
    const { reservationId } = req.params;
    const reservation = await getReservation(reservationId);

    if (!reservation) {
        return res.status(404).json({message: `reservation '${reservationId}' not found`});
    }

    req.reservation = reservation;
    next();
}

module.exports = checkReservationExist;
