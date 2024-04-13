const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  phone: Joi.string().required(),
  Address: Joi.object({
    Country: Joi.string().required(),
    City: Joi.string().required(),
    Address: Joi.string().required(),
    Street: Joi.string().required()
  }).required(),
  role: Joi.string().required().valid('user', 'admin')
});

const getUsers = {
  query: Joi.object().keys({
    firstname: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      firstname: Joi.string(),
      lastname: Joi.string(),
      phone: Joi.string().required(),
      Address: Joi.string().required(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
