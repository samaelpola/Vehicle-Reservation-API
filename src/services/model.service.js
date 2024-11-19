const Model = require("../models/model.model");

const checkNameAlreadyExist = async (modelName) => {
    const model = await Model.findOne({
        where: {
            name: modelName
        }
    });

    return model !== null;
}

const getModels = async () => {
    return await Model.findAll({include: {all: true}});
}

const getModel = async (modelId) => {
    return await Model.findByPk(modelId, {include: { all: true}});
}

const createModel = async (model) => {
    return await Model.create({...model});
}

const deleteModel = async (model) => {
    await model.destroy();
    return {"detail": "model delete"};
}

const updateModel = async (model, data) => {
    if (data.hasOwnProperty("name")) {
        model.name = data.name;
    }

    if (data.hasOwnProperty("make")) {
        model.make = data.make;
    }

    if (data.hasOwnProperty("year")) {
        model.year = data.year;
    }

    await model.save();
    return model;
}


module.exports = {checkNameAlreadyExist, createModel,deleteModel, getModel, getModels, updateModel};