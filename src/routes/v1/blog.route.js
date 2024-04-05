const express = require('express');
const multer = require('multer');
const blogController = require('../../controllers/blog.controller');
const validate  = require('../../middlewares/validate');
const blogValidation = require('../../validations/blog.validation');



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
.post(upload.fields([{ name: 'photos', maxCount: 10 }, { name: 'featuredImage', maxCount: 1 }]), validate(blogValidation.addBlog), blogController.addBlog)
.get(validate(blogValidation.getAllBlogs), blogController.getAllBlogs);

router

.route('/:id')
.put(upload.fields([{ name: 'photos', maxCount: 10 }, { name: 'featuredImage', maxCount: 1 }]), validate(blogValidation.updateBlog), blogController.updateBlog)
.get(blogController.getBlogById)
.delete(blogController.deleteBlogById);

module.exports = router;
