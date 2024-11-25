const Reservation = require("../models/reservation.model");
const {AlreadyReservedError} = require("../errors/reservation.error");
const {Op} = require("sequelize");


const isVehicleReserved = async (vehicleId, startDate, endDate, reservationId = null) => {
    const reservations = await Reservation.findAll({
        where: {
            [Op.and]: [
                {
                    vehicleId: vehicleId,
                    [Op.not]: {
                        id: reservationId
                    },
                    [Op.or]: [
                        {
                            [Op.and]: [
                                {
                                    startDate: { [Op.lte]: startDate },
                                    endDate: { [Op.gte]: endDate }
                                }
                            ]
                        },
                        {
                            [Op.and]: [
                                {
                                    startDate: { [Op.lte]: startDate },
                                    endDate: { [Op.gte]: startDate }
                                }
                            ]
                        },
                        {
                            [Op.and]: [
                                {
                                    startDate: { [Op.lte]: endDate },
                                    endDate: { [Op.gte]: endDate }
                                }
                            ]
                        },
                        {
                            [Op.and]: [
                                {
                                    startDate: { [Op.gte]: startDate },
                                    endDate: { [Op.lte]: endDate }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    });

    return reservations.length > 0;
};

const getReservations = async () => {
    return await Reservation.findAll({include: {all: true}});
}

const getReservation = async (reservationId) => {
    return await Reservation.findByPk(reservationId, {include: { all: true}});
}

const createReservation = async (reservation, customer, vehicle) => {
    const { startDate, endDate } = reservation;

    if (await isVehicleReserved(vehicle.id, startDate, endDate)) {
        throw new AlreadyReservedError("vehicle is already reserved");
    }

    const newReservation = await Reservation.create({
        startDate: startDate,
        endDate: endDate
    });

    newReservation.setCustomer(customer);
    newReservation.setVehicle(vehicle);

    await newReservation.save();
    return newReservation;
}

const deleteReservation = async (reservation) => {
    await reservation.destroy();
    return {"detail": "reservation delete"};
}

const updateReservation = async (reservation, data, customer, vehicle) => {
    if (data.hasOwnProperty("customerId")) {
        reservation.setCustomer(customer);
    }

    if (data.hasOwnProperty("vehicleId")) {
        reservation.setVehicle(vehicle);
    }

    if (data.hasOwnProperty("startDate") && data.hasOwnProperty("endDate")) {
        const vehicleId = data.hasOwnProperty("vehicleId") ? data.vehicleId : reservation.vehicleId;

        if (await isVehicleReserved(vehicleId, data.startDate, data.endDate, reservation.id)) {
            throw new AlreadyReservedError("vehicle is already reserved");
        }

        reservation.startDate = data.startDate;
        reservation.endDate = data.endDate;
        await reservation.save();
        return reservation;
    }

    if (data.hasOwnProperty("startDate")) {
        const vehicleId = data.hasOwnProperty("vehicleId") ? data.vehicleId : reservation.vehicleId;

        if (await isVehicleReserved(vehicleId, data.startDate, reservation.endDate)) {
            throw new AlreadyReservedError("vehicle is already reserved");
        }

        reservation.startDate = data.startDate;
        await reservation.save();
        return reservation;
    }

    if (data.hasOwnProperty("endDate")) {
        const vehicleId = data.hasOwnProperty("vehicleId") ? data.vehicleId : reservation.vehicleId;

        if (await isVehicleReserved(vehicleId, reservation.startDate, data.endDate)) {
            throw new AlreadyReservedError("vehicle is already reserved");
        }

        reservation.endDate = data.endDate;
        await reservation.save();
        return reservation;
    }

    const vehicleId = data.hasOwnProperty("vehicleId") ? data.vehicleId : reservation.vehicleId;
    if (await isVehicleReserved(vehicleId, reservation.startDate, reservation.endDate)) {
        throw new AlreadyReservedError("vehicle is already reserved");
    }

    await reservation.save();
    return await getReservation(reservation.id);
}


module.exports = {createReservation, deleteReservation, getReservation, getReservations, updateReservation};