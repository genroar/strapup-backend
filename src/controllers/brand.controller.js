const httpStatus = require('http-status');
//const { brandService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const brandService = require('../services/brand.service');



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

const getBrands = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'active']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await brandService.queryBrands(filter, options);
  res.send(result);
});

// Update Brand
const updateBrand = async (req, res, next) => {
  try {
    let brandData = { ...req.body };
    if (req.file) {
      brandData.image = req.file.path;
    }
    const brand = await brandService.updateBrand(req.params.id, brandData);
    res.status(httpStatus.OK).send(brand);
  } catch (error) {
    next(error);
  }
};

// Delete Brand

const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    await brandService.deleteBrand(id);
    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand
};

