const express = require('express');
const {getModels, createModel, updateModel, deleteModel} = require("../services/model.service");
const modelMiddleware = require("../middlewares/model.middleware");
const {checkSchema} = require("express-validator");
const {modelValidationRules, modelPatchValidationRules} = require("../schemas/model.schemas");
const validateSchema = require("../schemas/index");


const router = express.Router();


router.get("/", async (req, res) => {
    res.json(await getModels());
});

router.get("/:modelId", modelMiddleware, (req, res) => {
    res.json(req.model);
});

router.post("/", checkSchema(modelValidationRules), validateSchema, async (req, res) => {
    return res.status(201).json(await createModel(req.body));
});

router.patch("/:modelId", checkSchema(modelPatchValidationRules), validateSchema, modelMiddleware, async (req, res) => {
    return res.json(await updateModel(req.model, req.body));
});

router.delete("/:modelId", modelMiddleware, async (req, res) => {
    res.json(await deleteModel(req.model));
});

module.exports = router;
