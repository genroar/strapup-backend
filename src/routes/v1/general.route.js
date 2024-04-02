const express = require('express');
const generalController = require('../../controllers/general.controller');

const router = express.Router();

// Define routes
router.route('/conditions').get(generalController.getConditions);

router.route('/case-sizes').get(generalController.getCaseSizes);
router.route('/case-material').get(generalController.getCaseMaterial);
router.route('/original-box-papers').get(generalController.OriginalBoxPapers);
router.route('/price-type').get(generalController.PriceType);
router.route('/currency').get(generalController.Currency);
router.route('/get-flags-data').get(generalController.getAllFlags);


module.exports = router;


module.exports = router;
