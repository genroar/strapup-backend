const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const watchSchema = mongoose.Schema(
  {
    brand: { type: mongoose.Types.ObjectId, required: true },
    model: { type: mongoose.Types.ObjectId, required: true },
    year: { type: String, required: true },
    condition: { type: String, required: true },
    caseSize: { type: String, required: true },
    caseMaterial: { type: String, required: true },
    boxAndPapers: { type: String, required: true },
    photos: [{ type: String, required: true }],
    featuredImage: { type: String },
    priceType: { type: String, required: true },
    country: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    active: { type: Boolean, default: true }
  },
  {
    timestamps: true,
  }
);


watchSchema.plugin(toJSON);
watchSchema.plugin(paginate);

watchSchema.statics.isModelTaken = async function (watch, excludeUserId) {
  const watches = await this.findOne({ watch, _id: { $ne: excludeUserId } });
  return !!watches;
};

/**
 * @typedef Watch
 */
const Watch = mongoose.model('Watch', watchSchema);

module.exports = Watch;
