const {checkEmailAlreadyExist} = require("../services/customer.service");

const customerValidationRules = {
    lastName: {
        in: ["body"],
        isString: {
            errorMessage: "lastName must be a string"
        },
        notEmpty: {
            errorMessage: "lastName is required"
        }
    },
    firstName: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "firstName must be a string"
        },
        notEmpty: {
            errorMessage: "firstName is required"
        },
        errorMessage: "Invalid first name"
    },
    email: {
        in: ["body"],
        isEmail: {
            errorMessage: "Invalid email"
        },
        notEmpty: {
            errorMessage: "email is required"
        },
        custom: {
            options: async value => {
                if (await checkEmailAlreadyExist(value)) {
                    throw new Error(`Email '${value}' already exists`);
                }
            },
            errorMessage: "email already exists"
        }
    },
    phoneNumber: {
        in: ["body"],
        optional: true,
        notEmpty: {
            errorMessage: "phoneNumber cannot be empty if provided"
        }
    }
}

const customerPatchValidationRules = {
    lastName: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "Last name must be a string"
        },
        notEmpty: {
            errorMessage: "Last name is required"
        }
    },
    firstName: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "firstName must be a string"
        },
        notEmpty: {
            errorMessage: "firstName is required"
        }
    },
    email: {
        in: ["body"],
        optional: true,
        isEmail: {
            errorMessage: "Invalid email"
        },
        notEmpty: {
            errorMessage: "email is required"
        },
        custom: {
            options: async value => {
                if (await checkEmailAlreadyExist(value)) {
                    throw new Error(`Email '${value}' already exists`);
                }
            },
            errorMessage: "email already exists"
        }
    },
    phoneNumber: {
        in: ["body"],
        optional: true,
        notEmpty: {
            errorMessage: "phoneNumber cannot be empty if provided"
        }
    }
}


module.exports = {customerValidationRules, customerPatchValidationRules};
