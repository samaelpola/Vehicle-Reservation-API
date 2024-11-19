const Customer = require("../models/customer.model");

const checkEmailAlreadyExist = async (customerEmail) => {
    const customer = await Customer.findOne({
        where: {
            email: customerEmail
        }
    });

    return customer !== null;
}

const getCustomers = async () => {
    return await Customer.findAll({include: {all: true}});
}

const getCustomer = async (customerId) => {
    return await Customer.findByPk(customerId, {include: { all: true}});
}

const createCustomer = async (customer) => {
  return await Customer.create({...customer});
}

const deleteCustomer = async (customer) => {
    await customer.destroy();
    return {"detail": "customer delete"};
}

const updateCustomer = async (customer, data) => {
    if (data.hasOwnProperty("lastName")) {
        customer.lastName = data.lastName;
    }

    if (data.hasOwnProperty("firstName")) {
        customer.firstName = data.firstName;
    }

    if (data.hasOwnProperty("email")) {
        customer.email = data.email;
    }

    if (data.hasOwnProperty("phoneNumber")) {
        customer.phoneNumber = data.phoneNumber;
    }

    await customer.save();
    return customer;
}


module.exports = {checkEmailAlreadyExist, createCustomer,deleteCustomer, getCustomer, getCustomers, updateCustomer};