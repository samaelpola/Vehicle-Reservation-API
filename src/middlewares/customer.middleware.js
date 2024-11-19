const {getCustomer} = require("../services/customer.service");

const checkCustomerExist = async (req, res, next) => {
    const { customerId } = req.params;
    const customer = await getCustomer(customerId);

    if (!customer) {
        res.status(404).json({message: `customer '${customerId}' not found`})
    }

    req.customer = customer;
    next();
}

module.exports = checkCustomerExist;
