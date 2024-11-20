const {getModel} = require("../services/model.service");

const checkModelExist = async (req, res, next) => {
    const { modelId } = req.params;
    const model = await getModel(modelId);

    if (!model) {
        return res.status(404).json({message: `model '${modelId}' not found`});
    }

    req.model = model;
    next();
}

module.exports = checkModelExist;
