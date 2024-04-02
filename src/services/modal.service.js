const httpStatus = require('http-status');
const Model  = require('../models/model.model');
const ApiError = require('../utils/ApiError');
const cloudinaryService = require('./cloudinaryService');



// Create Modal
const createModel = async (modelBody) => {
  try {
    const nameCheck = await Model.findOne({ name: modelBody.name }).exec();
    if (nameCheck) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Model Name Already taken');
    }

    let imageUrls = null; 

    try {
      imageUrls = await cloudinaryService.uploadImage(modelBody.image, { folder: 'models' });
      console.log("imageurl", imageUrls);
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error uploading image', error);
    }

    // Create Model
    const modelData = { ...modelBody, image: imageUrls };
    return Model.create(modelData);
  } catch (error) {
    console.error("Error creating model:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error creating model', error);
  }
};


// Get Model

const getModels = async (filter, options) => {
  const models = await Model.paginate(filter, options);
  return models;
};


// Get Model By id


const getModelById = async (id) => {
  const model = await Model.findById(id);
  if (!model) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Model not found');
  }
  return model;
};

// Update Modal 

const updateModel = async (id, updateBody) => {
  try {
    const model = await Model.findById(id);
    if (!model) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Modal not found');
    }

    Object.assign(model, updateBody);

    if (updateBody.image) {
      let imageUrl = null;
      try {
        imageUrl = await cloudinaryService.uploadImage(updateBody.image, { folder: 'modals' });
        model.image = imageUrl;
      } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error uploading image', error);
      }
    }

    await model.save();
    return model;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error updating modal', error);
  }
};

// Delete Model

const deleteModel = async (id) => {
  const model = await Model.findById(id);
  if (!model) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Modal not found');
  }
  await model.remove();
};



module.exports = {
  createModel,
  getModels,
  getModelById,
  updateModel,
  deleteModel
};
