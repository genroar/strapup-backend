// routes/notificationsRoutes.js
const express = require('express');
const router = express.Router();
const notificationsController = require('../../controllers/notification.controller');

router
  .route


router
    .route('/')
    .post(notificationsController.createNotification)
    .get(notificationsController.getNotifications)

router 
    .route('/:id')
    .get(notificationsController.getNotificationById)
    .put(notificationsController.updateNotification)
    .delete(notificationsController.deleteNotification);

module.exports = router;
