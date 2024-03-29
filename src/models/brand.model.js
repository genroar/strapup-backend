const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const brandSchema = mongoose.Schema(
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
    model: {
      type: [mongoose.Types.ObjectId],
      default:[]
    },

  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
brandSchema.plugin(toJSON);
brandSchema.plugin(paginate);

brandSchema.statics.isBrandTaken = async function (brand, excludeUserId) {
  const brandr = await this.findOne({ brand, _id: { $ne: excludeUserId } });
  return !!brandr;
};

/**
 * @typedef Brand
 */
const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
