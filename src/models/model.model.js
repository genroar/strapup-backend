const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const modelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true
      },
    active: {
      type: Boolean,
      required: true,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref:'Brand'
    },
  },
  {
    timestamps: true,
  }
);


modelSchema.plugin(toJSON);
modelSchema.plugin(paginate);

modelSchema.statics.isModelTaken = async function (model, excludeUserId) {
  const models = await this.findOne({ model, _id: { $ne: excludeUserId } });
  return !!models;
};

/**
 * @typedef Model
 */
const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
