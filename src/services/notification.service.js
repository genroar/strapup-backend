// services/notificationsService.js
const Notification = require('../models/notification.model');

// Function to create a new notification
const createNotification = async (notificationData) => {
    try {
        const notification = new Notification(notificationData);
        await notification.save();
        return notification;
    } catch (error) {
        throw new Error('Could not create notification');
    }
};

// Function to get notifications based on query parameters
const getNotifications = async (queryParams) => {
    const { read } = queryParams;
    const filter = read && read !== 'all' ? { read } : {};
    return await Notification.find(filter);
};

// Function to get a notification by ID
const getNotificationById = async (notificationId) => {
    return await Notification.findById(notificationId);
};

// Function to update a notification by ID
const updateNotification = async (notificationId, updateData) => {
    return await Notification.findByIdAndUpdate(notificationId, updateData, { new: true });
};

// Function to delete a notification by ID
const deleteNotification = async (notificationId) => {
    return await Notification.findByIdAndDelete(notificationId);
};

module.exports = {
    createNotification,
    getNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification
};
