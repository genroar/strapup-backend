const httpStatus = require('http-status');
const { Brand } = require('../models');
const ApiError = require('../utils/ApiError');
const cloudinaryService = require('./cloudinaryService');

const createBrand = async (brandBody) => {
  try {
    console.log("In service", brandBody);

    const nameCheck = await Brand.findOne({ name: brandBody.name }).exec();
    if (nameCheck) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Brand Name Already taken');
    }

    console.log("brbody ", brandBody);

    let imageUrl = null; // Initialize imageUrl variable

    try {
      imageUrl = await cloudinaryService.uploadImage(brandBody.image, { folder: 'brands' });
      console.log("imrageurl", imageUrl);
    } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error uploading image', error);
    }

    // Create brand
    const brandData = { ...brandBody, image: imageUrl };
    return Brand.create(brandData);
  } catch (error) {
    console.log("I am here in error", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error creating brand', error);
  }
};

module.exports = {
  createBrand
};
