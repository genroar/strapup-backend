const httpStatus = require('http-status');
const { Brand } = require('../models');
const ApiError = require('../utils/ApiError');
const cloudinaryService = require('./cloudinaryService');

const createBrand = async (brandBody) => {
  try {
    const nameCheck = await Brand.findOne({ name: brandBody.name }).exec();
    if (nameCheck) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Brand Name Already taken');
    }

    let imageUrl = null; // Initialize imageUrl variable

    try {
      imageUrl = await cloudinaryService.uploadImage(brandBody.image, { folder: 'brands' });
    } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error uploading image', error);
    }

    // Create brand
    const brandData = { ...brandBody, image: imageUrl };
    return Brand.create(brandData);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error creating brand', error);
  }
};

// get brands that are active
const queryBrands = async (filter, options) => {
  const brands = await Brand.paginate(filter, options);
  return brands;
};
const getBrandById = async (id) => {
  return Brand.findById(id);
};

const updateBrandById = async (brandId, updateBody) => {
  const brand = await getBrandById(brandId);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  }
  if (updateBody.name && (await Brand.isBrandTaken(updateBody.name, brandId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Brand name already Registered');
  }
  Object.assign(brand, updateBody);
  await brand.save();
  return brand;
};

module.exports = {
  createBrand,
  queryBrands,
  updateBrandById,
};
