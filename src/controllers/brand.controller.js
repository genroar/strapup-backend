const httpStatus = require('http-status');
const { brandService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');

const createBrand = catchAsync(async (req, res, next) => {
  try {
    const brand = await brandService.createBrand({
      ...req.body,
      image: req.file.path, // Use the path of the uploaded file
    });
    res.status(httpStatus.CREATED).send(brand);
  } catch (error) {
    next(error);
  }
});

const getBrands = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'active']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await brandService.queryBrands(filter, options);
  res.send(result);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await brandService.updateBrandById(req.params.brandId, req.body);
  res.send(user);
});

module.exports = {
  createBrand,
  getBrands,
  updateUser,
};
