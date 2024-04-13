const express = require('express');
const router = express.Router();
const validate = require('../../middlewares/validate');
const watchController = require('../../controllers/submitoffer.controller');
const watchValidation = require('../../validations/submitoffer.validation');


router
.route('/')
.post(validate(watchValidation.submitOfferValidation),watchController.submitOffer);

module.exports = router;
