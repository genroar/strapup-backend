const SubmitOffer = require('../models/watch.model');

async function submitOffer(userId, price, currency, adId) {
    try {
  
      const watch = await SubmitOffer.findById(adId);
      if (!watch) {
        throw new Error('Watch not found');
      }
  
      watch.offers.push({ userId, price, currency });
      await watch.save();
      
      return { message: 'Offer submitted successfully' };
    } catch (error) {
      throw new Error(error.message);
    }
}

module.exports = { submitOffer };
