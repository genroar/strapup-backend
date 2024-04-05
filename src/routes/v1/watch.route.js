const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const watchController = require('../../controllers/watch.controller');
const multer = require('multer');
const watchValidation = require('../../validations/watch.validation');
const language = require('../../middlewares/language');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.route('/list').get(language,watchController.getAllListWatches)

router.route('/')
.post(auth('createWatch'),language, upload.fields([{ name: 'photos', maxCount: 10 }, { name: 'featuredImage', maxCount: 1 }]), validate(watchValidation.watchSchema), watchController.createWatch)
.get(language,watchController.getAllWatches);

router.route('/:id')
.get(language, watchController.getWatchById)
.put(language, upload.fields([{ name: 'photos', maxCount: 10 }, { name: 'featuredImage', maxCount: 1 }]), validate(watchValidation.watchSchema), watchController.updateWatch)
.delete(language, watchController.deleteWatch);


module.exports = router;
