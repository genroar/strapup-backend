const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const yearsController = require('../../controllers/years.controller');

const router = express.Router();


router
  .route


router
  .route('/')
  .get(yearsController.getYears)
  .post(yearsController.generateYears)
 
 router
 .route('/:id')

module.exports = router;
