const httpStatus = require('http-status'); 
const watchService = require('../services/watch.service');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');

// Create Watch
const createWatch = async (req, res, next) => {
  try {
    let photos = null;
    let featuredImage = null;

    if (req.files && req.files['photos']) {
      photos = req.files['photos'].map(file => file.path);
    }

    if (req.files && req.files['featuredImage']) {
      featuredImage = req.files['featuredImage'][0].path;
    }

    const watch = await watchService.createWatch({
      ...req.body,
      photos: photos,
      featuredImage: featuredImage
    });
    res.status(httpStatus.CREATED).send(watch);
  } catch (error) {
    next(error);
  }
};



// Update Watch
const updateWatch = async (req, res, next) => {
  try {
    let watchData = { ...req.body };
    if (req.files && req.files['photos']) {
      watchData.photos = req.files['photos'].map(file => file.path);
    }
    // Check if req.files exists and if 'featuredImage' is present
    if (req.files && req.files['featuredImage']) {
      watchData.featuredImage = req.files['featuredImage'][0].path;
    }

    const watch = await watchService.updateWatch(req.params.id, watchData);
    res.status(httpStatus.OK).send(watch);
  } catch (error) {
    next(error);
  }
};


// Get All Watch

const getAllWatches = catchAsync(async (req, res) => {
  const watches = await watchService.getAllWatches();
  res.send(watches);
});


// Get Watch By Id


const getWatchById = catchAsync(async (req, res) => {
  const watch = await watchService.getWatchById(req.params.id);
  if (!watch) {
    return res.status(httpStatus.NOT_FOUND).send({ error: 'Watch not found' });
  } 
  res.send(watch);
});


// Delete Watch

const deleteWatch = catchAsync(async (req, res) => {
  await watchService.deleteWatch(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
  createWatch,
  getAllWatches,
  getWatchById,
  deleteWatch,
  updateWatch
};
