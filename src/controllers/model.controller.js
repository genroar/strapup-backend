const httpStatus = require('http-status'); 
const modelService = require('../services/modal.service');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const translation = require('../static/translation.json')


// Create Model
const createModel = async (req, res, next) => {
  try {
    const model = await modelService.createModel({
      ...req.body,
      'image': req.file.path // Use the path of the uploaded file
    });
    const language = req.language;
    const response = {
        message: translation[language]['hello'],
        status: 200,
       data:model
    }
    res.status(httpStatus.CREATED).send(response);
  } catch (error) {
   
    next(error);
  }
};



// Get Models
const getModels = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'active']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await modelService.getModels(filter, options);
  const language = req.language;
  const response = {
      message: translation[language]['hello'],
      status: 200,
     data:result
  }
  res.send(response);
});

// Get Model by ID
const getModelById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = await modelService.getModelById(id);
    if (!model) {
      return res.status(httpStatus.NOT_FOUND).send({ error: 'Model not found' });
    }
    const language = req.language;
    const response = {
        message: translation[language]['hello'],
        status: 200,
       data:model
    }
    res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
};


// Update Brand
const updateModel = async (req, res, next) => {
  try {
    let modelData = { ...req.body };
    if (req.file) {
      modelData.image = req.file.path;
    }
    const model = await modelService.updateModel(req.params.id, modelData);
    const language = req.language;
    const response = {
        message: translation[language]['hello'],
        status: 200,
       data:model
    }
    res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
};

// Delete Brand

const deleteModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    await modelService.deleteModel(id);
    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createModel,
  getModels,
  getModelById,
  updateModel,
  deleteModel
};

