const mongoose = require('mongoose');

const notificationModel = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    read: { type: Boolean, default: false },
    receivedTo: { type: mongoose.Types.ObjectId, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationModel);

module.exports = Notification;
