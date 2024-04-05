const Joi = require('joi');

const getOffersValidation = Joi.object({
    active: Joi.boolean(),
    currency: Joi.string(),
    userId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    priceMax: Joi.number().min(Joi.ref('priceMin')),
    priceMin: Joi.number(),
    adId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
});

const submitOfferValidation = Joi.object({
    price: Joi.number().required(),
    currency: Joi.string().required(),
    adId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
});

const updateOfferValidation = Joi.object({
    offerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    price: Joi.number().required(),
    currency: Joi.string().required(),
});

module.exports = { getOffersValidation, submitOfferValidation, updateOfferValidation };
