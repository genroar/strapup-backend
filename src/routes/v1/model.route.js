const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const modelValidation = require('../../validations/model.validation');
const modelController = require('../../controllers/model.controller');
const multer =require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Specify the destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Define the filename for uploaded files
  }
});

// Create a Multer instance with the configured storage options
const upload = multer({ storage: storage });

const router = express.Router();


router
  .route


router
  .route('/')
  .post(upload.single('image'),validate(modelValidation.createModel), modelController.createModel)
  .get(auth('getModels'), validate(modelValidation.getModels),modelController.getModels)
 
 router
 .route('/:id')
 .get(validate(modelValidation.getModelById), modelController.getModelById)
 .put(upload.single('image'),validate(modelValidation.updateModel), modelController.updateModel)
 .delete(validate(modelValidation.deleteModel), modelController.deleteModel);

module.exports = router;
