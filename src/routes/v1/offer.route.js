const express = require('express');
const offerController = require('../../controllers/offer.controller');
const validate = require('../../middlewares/validate');
const offerValidation = require('../../validations/offer.validation');

const router = express.Router();

router
  .route('/')
  .get(validate(offerValidation.getOffers), offerController.getOffers)
  .post(validate(offerValidation.submitOffer), offerController.submitOffer);

  router
  .route('/:userId')
  .put(validate(offerValidation.updateOffer), offerController.updateOffer);

module.exports = router;
