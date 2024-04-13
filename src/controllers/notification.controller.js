// controllers/notificationsController.js
const notificationService = require('../services/notification.service');

// Function to create a new notification
const createNotification = async (req, res) => {
    try {
        const notification = await notificationService.createNotification(req.body);
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get all notifications
const getNotifications = async (req, res) => {
    try {
        const notifications = await notificationService.getNotifications(req.query);
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get a notification by ID
const getNotificationById = async (req, res) => {
    try {
        const notification = await notificationService.getNotificationById(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to update a notification by ID
const updateNotification = async (req, res) => {
    try {
        const notification = await notificationService.updateNotification(req.params.id, req.body);
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to delete a notification by ID
const deleteNotification = async (req, res) => {
    try {
        await notificationService.deleteNotification(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createNotification,
    getNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification
};
