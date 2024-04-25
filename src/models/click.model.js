const mongoose = require('mongoose');

const clicksSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: false,
  },
  totalCount: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true,
});

const Clicks = mongoose.model('Clicks', clicksSchema);

module.exports = Clicks;