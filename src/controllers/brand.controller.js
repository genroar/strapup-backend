const httpStatus = require('http-status'); 
const { brandService } = require('../services');

const createBrand = async (req, res, next) => {
  try {
    console.log("In Controller",req.body,req.file.path)
    const brand = await brandService.createBrand({
      ...req.body,
      'image': req.file.path // Use the path of the uploaded file
    });
    res.status(httpStatus.CREATED).send(brand);
  } catch (error) {
   
    next(error);
  }
};

module.exports = {
  createBrand
};

