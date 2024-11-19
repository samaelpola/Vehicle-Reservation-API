const {checkNameAlreadyExist} = require("../services/model.service");

const modelValidationRules = {
    name: {
        in: ["body"],
        notEmpty: {
            errorMessage: "name is required"
        },
        isString: {
            errorMessage: "name must be a string"
        },
        custom: {
            options: async value => {
                if (await checkNameAlreadyExist(value)) {
                    throw new Error(`Model name '${value}' already exists`);
                }
            },
            errorMessage: "Model name already exists"
        }
    },
    make: {
        in: ["body"],
        isString: {
            errorMessage: "make must be a string"
        },
        notEmpty: {
            errorMessage: "make is required"
        }
    },
    year: {
        in: ["body"],
        isNumeric: {
            errorMessage: "year must be a number"
        },
        notEmpty: {
            errorMessage: "year is required"
        }
    }
}

const modelPatchValidationRules = {
    name: {
        in: ["body"],
        optional: true,
        notEmpty: {
            errorMessage: "name is required"
        },
        isString: {
            errorMessage: "name must be a string"
        },
        custom: {
            options: async value => {
                if (await checkNameAlreadyExist(value)) {
                    throw new Error(`Model name '${value}' already exists`);
                }
            },
            errorMessage: "Model name already exists"
        }
    },
    make: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "make must be a string"
        },
        notEmpty: {
            errorMessage: "make is required"
        }
    },
    year: {
        in: ["body"],
        optional: true,
        isNumeric: {
            errorMessage: "year must be a number"
        },
        notEmpty: {
            errorMessage: "year is required"
        }
    }
}


module.exports = {modelValidationRules, modelPatchValidationRules};
