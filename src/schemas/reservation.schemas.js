const {getCustomer} = require("../services/customer.service");
const {getVehicle} = require("../services/vehicle.service");

const reservationValidationRules = {
    startDate: {
        in: ["body"],
        notEmpty: {
            errorMessage: "startDate is required"
        },
        isDate: {
            errorMessage: "startDate must be a date"
        }
    },
    endDate: {
        in: ["body"],
        isDate: {
            errorMessage: "endDate must be a date"
        },
        notEmpty: {
            errorMessage: "endDate is required"
        },
        custom: {
            options: (value, { req }) => {
                if (new Date(value) <= new Date(req.body.startDate)) {
                    throw new Error("endDate must be after startDate");
                }

                return true;
            }
        }
    },
    customerId: {
        in: ["body"],
        isNumeric: {
            errorMessage: "customerId must be a number"
        },
        notEmpty: {
            errorMessage: "customerId is required"
        },
        custom: {
            options: async (value, {req}) => {
                const customer = await getCustomer(value);

                if (!customer) {
                    throw new Error(`Customer '${value}' not found`);
                }

                req.customer = customer;
            }
        }
    },
    vehicleId: {
        in: ["body"],
        isNumeric: {
            errorMessage: "vehicleId must be a number"
        },
        notEmpty: {
            errorMessage: "vehicleId is required"
        },
        custom: {
            options: async (value, {req}) => {
                const vehicle = await getVehicle(value);

                if (!vehicle) {
                    throw new Error(`Vehicle '${value}' not found`);
                }

                req.vehicle = vehicle;
            }
        }
    }
}

const reservationPatchValidationRules = {
    startDate: {
        in: ["body"],
        optional: true,
        notEmpty: {
            errorMessage: "startDate is required"
        },
        isDate: {
            errorMessage: "startDate must be a date"
        }
    },
    endDate: {
        in: ["body"],
        optional: true,
        isDate: {
            errorMessage: "endDate must be a date"
        },
        notEmpty: {
            errorMessage: "endDate is required"
        },
        custom: {
            options: (value, { req }) => {
                if (new Date(value) <= new Date(req.body.startDate)) {
                    throw new Error("endDate must be after startDate");
                }

                return true;
            }
        }
    },
    customerId: {
        in: ["body"],
        optional: true,
        isNumeric: {
            errorMessage: "customerId must be a number"
        },
        notEmpty: {
            errorMessage: "customerId is required"
        },
        custom: {
            options: async (value, {req}) => {
                const customer = await getCustomer(value);

                if (!customer) {
                    throw new Error(`Customer '${value}' not found`);
                }

                req.customer = customer;
            }
        }
    },
    vehicleId: {
        in: ["body"],
        optional: true,
        isNumeric: {
            errorMessage: "vehicleId must be a number"
        },
        notEmpty: {
            errorMessage: "vehicleId is required"
        },
        custom: {
            options: async (value, {req}) => {
                const vehicle = await getVehicle(value);

                if (!vehicle) {
                    throw new Error(`Vehicle '${value}' not found`);
                }

                req.vehicle = vehicle;
            }
        }
    }
}


module.exports = {reservationValidationRules, reservationPatchValidationRules};
