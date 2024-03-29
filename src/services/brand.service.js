const httpStatus = require('http-status');
const { Brand } = require('../models');
const ApiError = require('../utils/ApiError');
const cloudinaryService = require('./cloudinaryService');



// Create Brand
const createBrand = async (brandBody) => {
  try {
    console.log("In service", brandBody);

    const nameCheck = await Brand.findOne({ name: brandBody.name }).exec();
    if (nameCheck) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Brand Name Already taken');
    }

    let imageUrl = null; // Initialize imageUrl variable
    console.log("brbody ", brandBody);

    let imageUrl = null; 

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

// get brands that are active
const queryBrands = async (filter, options) => {
  const brands = await Brand.paginate(filter, options);
  return brands;
};
const getBrandById = async (id) => {
  return Brand.findById(id);
// Update Brand 

const updateBrand = async (id, updateBody) => {
  try {
    const brand = await Brand.findById(id);
    if (!brand) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
    }

    Object.assign(brand, updateBody);

    if (updateBody.image) {
      let imageUrl = null;
      try {
        imageUrl = await cloudinaryService.uploadImage(updateBody.image, { folder: 'brands' });
        brand.image = imageUrl;
      } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error uploading image', error);
      }
    }

    await brand.save();
    return brand;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error updating brand', error);
  }
};

const updateBrandById = async (brandId, updateBody) => {
  const brand = await getBrandById(brandId);
// Delete Brand

const deleteBrand = async (id) => {
  const brand = await Brand.findById(id);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  }
  if (updateBody.name && (await Brand.isBrandTaken(updateBody.name, brandId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Brand name already Registered');
  }
  Object.assign(brand, updateBody);
  await brand.save();
  return brand;
  await brand.remove();
};



module.exports = {
  createBrand,
  queryBrands,
  updateBrandById,
  updateBrand,
  deleteBrand
};
