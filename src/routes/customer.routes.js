const express = require("express");
const {checkSchema} = require("express-validator");
const validateSchema = require("../schemas/index");
const customerMiddleware = require("../middlewares/customer.middleware");
const {getCustomers, createCustomer, deleteCustomer, updateCustomer} = require("../services/customer.service");
const {customerValidationRules, customerPatchValidationRules} = require("../schemas/customer.schemas");

const router = express.Router();

router.get("/", async (req, res) => {
    res.json(await getCustomers());
});

router.get("/:customerId", customerMiddleware, (req, res) => {
    res.json(req.customer);
});

router.post("/", checkSchema(customerValidationRules), validateSchema, async (req, res) => {
    return res.status(201).json(await createCustomer(req.body));
});

router.patch("/:customerId", checkSchema(customerPatchValidationRules), validateSchema, customerMiddleware, async (req, res) => {
    return res.json(await updateCustomer(req.customer, req.body));
});

router.delete("/:customerId", customerMiddleware, async (req, res) => {
    res.json(await deleteCustomer(req.customer));
});

module.exports = router;