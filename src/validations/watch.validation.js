const Joi = require('joi');
const httpStatus = require('http-status');

const watchesSchema = Joi.object({
  brand: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.string().required(),
  condition: Joi.string().required(),
  caseSize: Joi.string().required(),
  caseMaterial: Joi.string().required(),
  boxAndPapers: Joi.string().required(),
  photos: Joi.array().items(Joi.string()).min(1).required(),
  featuredImage: Joi.string().when('photos', {
    is: Joi.array().min(1).required(),
    then: Joi.string().required(),
    otherwise: Joi.string().allow('')
  }),
  priceType: Joi.string().required(),
  country: Joi.string().required(),
  price: Joi.number().min(0).required(),
  currency: Joi.string().required(),
  active: Joi.boolean().default(true),
  adType: Joi.string().valid('ad', 'consign', 'source').required(),
  email: Joi.string().email().allow(''),
  phoneNumber: Joi.string().allow(''),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

const watchSchema = (req, res, next) => {
  const { error } = watchesSchema.validate(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.details[0].message });
  }
  next();
};

const watchIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

module.exports = {
  watchSchema,
  watchIdSchema,
};
