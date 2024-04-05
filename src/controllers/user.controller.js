const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const translation = require('../static/translation.json')

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const language = req.language;
  const response = {
      message: translation[language]['hello'],
      status: 200,
      data:user
  }
  res.status(httpStatus.CREATED).send(response);
});

const getUsers = catchAsync(async (req, res) => {
  const language = req.language;
  const filter = pick(req.query, ['firstname', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send({
    message: translation[language]['hello'],
    status: 200,
    data:result
   })
});


const getUser = catchAsync(async (req, res) => {
  const language = req.language;
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send({
    message: translation[language]['hello'],
    status: 200,
    data:user
   })
});

// const getUser = catchAsync(async (req, res) => {
//   const { userId } = req.params;
//   const language = req.user.language || 'en';

//   const user = await userService.getUserById(userId, language);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   res.send(user);
// });

const updateUser = catchAsync(async (req, res) => {
  const language = req.language;
  const user = await userService.updateUserById(req.params.userId, req.body);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send({
    message: translation[language]['hello'],
    status: 200,
    data:user
   })
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
