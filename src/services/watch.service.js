// watch.service.js
const httpStatus = require('http-status');
const Watch  = require('../models/watch.model');
const ApiError = require('../utils/ApiError');
const cloudinaryService = require('./cloudinaryService');

// Create Watch
const createWatch = async (watchBody) => {
  try {
    let imageUrls = [];
    let featuredImageUrl = null;
    
    if (Array.isArray(watchBody.photos)) {
      imageUrls = await Promise.all(watchBody.photos.map(async (photo) => {
        return await cloudinaryService.uploadImage(photo, { folder: 'watches' });
      }));
    } else {
      imageUrls.push(await cloudinaryService.uploadImage(watchBody.photos, { folder: 'watches' }));
    }

    if (watchBody.featuredImage) {
      featuredImageUrl = await cloudinaryService.uploadImage(watchBody.featuredImage, { folder: 'watches' });
    }

    const watchData = { ...watchBody, photos: imageUrls, featuredImage: featuredImageUrl };
    return Watch.create(watchData);
  } catch (error) {
    console.error("Error creating watch:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error creating watch', error);
  }
};


// Update Watch

const updateWatch = async (id, updateBody) => {
  try {
    // Check if photos or featuredImage are provided in the updateBody
      const watches = await Watch.findById(id);
      if (!watches) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Watch not found');
      }

      Object.assign(watches, updateBody);

      if (Array.isArray(updateBody.photos)) {
        try{
          let imageUrl = null;
          imageUrl = await Promise.all(updateBody.photos.map(async (photo) => {
            return await cloudinaryService.uploadImage(photo, { folder: 'watches' });
          }));
          watches.photos =imageUrl;
        }catch {

        }
      } else {
        try{
          let imageUrl = null;
        imageUrl.push(await cloudinaryService.uploadImage(updateBody.photos, { folder: 'watches' }));
        watches.photos =imageUrl;
        }catch {

        }
      }
      if (updateBody.featuredImage) {
        let featuredImageURL = null;
        try{
          featuredImageURL = await cloudinaryService.uploadImage(updateBody.featuredImage, { folder: 'watches' });
          watches.featuredImage = featuredImageURL;
        }catch{}
      }

      

      await watches.save();

    return watches;
  } catch (error) {
    console.error("Error updating watch:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error updating watch', error);
  }
};

// Get All Watch

const getAllWatches = async () => {
  return Watch.find();
};

// Get Watch By id

const getWatchById = async (id) => {
  return Watch.findById(id);
};

// Dlete Watch

const deleteWatch = async (id) => {
  await Watch.findByIdAndDelete(id);
};


module.exports = {
  createWatch,
  getAllWatches,
  getWatchById,
  deleteWatch,
  updateWatch
};
