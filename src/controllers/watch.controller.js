const httpStatus = require('http-status'); 
const watchService = require('../services/watch.service');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const translation = require('../static/translation.json')

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
    const language = req.language;
    const response = {
        message: translation[language]['hello'],
        status: 200,
       data:watch
    }
    res.status(httpStatus.CREATED).send(response);
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
    const language = req.language;
    const response = {
        message: translation[language]['hello'],
        status: 200,
       data:watch
    }
    res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
};


// Get All Watch

const getAllWatches = catchAsync(async (req, res) => {
  const language = req.language;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const watches = await watchService.getAllWatches(options);
  const response = {
    message: translation[language]['hello'],
    status: 200,
    data:watches
}
  res.send(response);
});

// Get List Watches
// Get All Watch
const getAllListWatches = catchAsync(async (req, res) => {
  const { brand, model, year, condition, price, country, orderBy, search, adType } = req.query;
  
  // Construct query based on provided parameters
  const query = {};
  if (brand) query.brand = brand;
  if (model) query.model = model;
  if (year) query.year = year;
  if (condition) query.condition = condition;
  if (price) query.price = price;
  if (country) query.country = country;
  if (adType) query.adType = adType;

  const options = pick(req.query, ['sortBy', 'limit', 'page']); // Assuming you have a function called 'pick' that extracts specific fields from an object
  
  const watches = await watchService.getAllListWatches(query, options);
  const language = req.language;
    const response = {
        message: translation[language]['hello'],
        status: 200,
       data:watches
    }
    res.status(httpStatus.OK).send(response);
  res.send(watches);
});

// Get Watch By Id


const getWatchById = catchAsync(async (req, res) => {
  const watch = await watchService.getWatchById(req.params.id);
  if (!watch) {
    return res.status(httpStatus.NOT_FOUND).send({ error: 'Watch not found' });
  } 
  const language = req.language;
    const response = {
        message: translation[language]['hello'],
        status: 200,
       data:watch
    }
    res.status(httpStatus.OK).send(response);
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
  getAllListWatches,
  updateWatch
};
