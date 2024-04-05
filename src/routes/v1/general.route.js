const express = require('express');
const generalController = require('../../controllers/general.controller');
const language = require('../../middlewares/language');

const router = express.Router();

// Define routes
router.route('/conditions').get(language, generalController.getConditions);

router.route('/case-sizes').get(language, generalController.getCaseSizes);
router.route('/case-material').get(language, generalController.getCaseMaterial);
router.route('/original-box-papers').get(language, generalController.OriginalBoxPapers);
router.route('/price-type').get(language, generalController.PriceType);
router.route('/currency').get(generalController.Currency);
router.route('/get-flags-data').get(language, generalController.getAllFlags);


module.exports = router;


module.exports = router;
