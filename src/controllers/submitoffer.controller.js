const httpStatus = require('http-status');
const { submitOfferValidation } = require('../validations/submitoffer.validation');
const watchService = require('../services/submitoffer.service');

async function submitOffer(req, res, next) {
    const { error } = submitOfferValidation.validate(req.body);
    if (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: error.details[0].message });
    }
  
    const { price, currency, adId } = req.body;
    const userId = '660d207602ce56e2cc6d77fd'; 
  
    try {
      const result = await watchService.submitOffer(userId, price, currency, adId);
      return res.status(httpStatus.OK).json(result);
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

module.exports = { submitOffer };
