const express = require('express');
const router = express.Router();
const addClickController  = require('../../controllers/click.controller');
const addClickValidation = require('../../validations/click.validation')

// POST /clicks

router
  .route


router
  .route('/')
.post(addClickValidation.validateClickData, addClickController.addClick);

module.exports = router;
