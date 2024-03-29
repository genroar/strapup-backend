const Joi = require('joi');


// Create Model
const createModel = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    active: Joi.boolean().required()
  }),
};

// Get Model
const getModels = {
  query: Joi.object().keys({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
  }),
};


// Get Model byid 

const getModelById = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};


// Update 
const updateModel = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  }),
  body: Joi.object({
    name: Joi.string().required(),
    active: Joi.boolean().required()
  })
});

// Delete Model
const deleteModel = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  })
});


module.exports = {
  createModel,
  getModels,
  getModelById,
  updateModel,
  deleteModel
};


//joi documentation