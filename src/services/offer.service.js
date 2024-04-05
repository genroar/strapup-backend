const Offer = require('../models/offer.model');

const getOffers = async (query) => {
  return Offer.find(query);
};

const submitOffer = async(userId, price, currency, adId) => {
  try {
      const offer = new Offer({ userId, price, currency, adId });
      await offer.save();
      return offer;
  } catch (error) {
      throw new Error(error.message);
  }
}
const updateOffer = async (id) => {
  try {
    const offer = await Offer.findById(id);
    if (!offer) {
      throw new Error('Offer not found');
    }
    return offer;
  } catch (error) {
    console.error('Error updating offer:', error);
    throw error; // Rethrow the error to be caught by the calling function
  }
};


module.exports = { getOffers, updateOffer, submitOffer };
