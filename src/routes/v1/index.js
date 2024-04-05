const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const brandRoute = require('./brand.route');
const modelRoute = require('./model.route');
const yearsRoute = require('./year.route');
const generalRoute = require('./general.route');
const watchRoute = require('./watch.route');
const offerRoute = require('./offer.route');
const blogRoute = require('./blog.route');

const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/brands',
    route: brandRoute,
  },
  {
    path: '/models',
    route: modelRoute,
  },
  {
    path: '/years',
    route: yearsRoute,
  },
  {
    path: '',
    route: generalRoute,
  },
  {
    path: '/watches',
    route: watchRoute,
  },
  {
    path: '/offers',
    route: offerRoute,
  },
  {
    path: '/blogs',
    route: blogRoute,
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
