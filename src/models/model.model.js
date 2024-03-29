const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
    },
  },
  {
    timestamps: true,
  }
);

const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
