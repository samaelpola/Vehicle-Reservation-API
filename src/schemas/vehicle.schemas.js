const {checkRegistrationAlreadyExist} = require("../services/vehicle.service");
const {getModel} = require("../services/model.service");

const vehicleValidationRules = {
    registration: {
        in: ["body"],
        notEmpty: {
            errorMessage: "registration is required"
        },
        isString: {
            errorMessage: "registration must be a string"
        },
        custom: {
            options: async value => {
                if (await checkRegistrationAlreadyExist(value)) {
                    throw new Error(`registration '${value}' already exists`);
                }
            },
            errorMessage: "registration already exists"
        }
    },
    modelId: {
        in: ["body"],
        notEmpty: {
            errorMessage: "modelId is required"
        },
        isNumeric: {
            errorMessage: "modelId must be a number"
        },
        custom: {
            options: async (value, {req}) => {
                const model = await getModel(value);

                if (!model) {
                    throw new Error(`model '${value}' not found`);
                }

                req.model = model;
            }
        }
    }
}

const vehiclePatchValidationRules = {
    registration: {
        in: ["body"],
        optional: true,
        notEmpty: {
            errorMessage: "registration is required"
        },
        isString: {
            errorMessage: "registration must be a string"
        },
        custom: {
            options: async value => {
                if (await checkRegistrationAlreadyExist(value)) {
                    throw new Error(`registration '${value}' already exists`);
                }
            },
            errorMessage: "registration already exists"
        }
    },
    modelId: {
        in: ["body"],
        optional: true,
        notEmpty: {
            errorMessage: "modelId is required"
        },
        isNumeric: {
            errorMessage: "modelId must be a number"
        },
        custom: {
            options: async (value, {req}) => {
                const model = await getModel(value);

                if (!model) {
                    throw new Error(`model '${value}' not found`);
                }

                req.model = model;
            }
        }
    }
}

module.exports = {vehicleValidationRules, vehiclePatchValidationRules};
