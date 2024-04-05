const httpStatus = require('http-status');
const OfferService = require('../services/offer.service');

const getOffers = async (req, res) => {
  try {
    const { active, currency, userId, priceMax, priceMin, adId } = req.query;
    
    // Construct query based on provided parameters
    const query = {};
    if (active !== undefined) query.active = active;
    if (currency) query.currency = currency;
    if (userId) query.userId = userId;
    if (priceMax !== undefined) query.price = { $lte: priceMax };
    if (priceMin !== undefined) query.price = { ...query.price, $gte: priceMin };
    if (adId) query.adId = adId;

    const offers = await OfferService.getOffers(query);
    res.status(httpStatus.OK).json(offers);
  } catch (error) {
    console.error('Error getting offers:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

const submitOffer = async (req, res, next) => {
  try {
      const { price, currency, adId } = req.body;
      const userId = '660c5f97021daa4559648933';

      const offer = await OfferService.submitOffer(userId, price, currency, adId);
      return res.status(httpStatus.OK).json({ offer });
  } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}

const updateOffer = async (req, res, next) => {
  try {
    let offerData = { ...req.body };
    const updatedOffer = await OfferService.updateOffer(req.params.id, offerData);
    res.status(httpStatus.OK).send(updatedOffer);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};


module.exports = { getOffers, submitOffer, updateOffer };
