const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const yearsSchema = new mongoose.Schema({
  startYear: { type: Number, required: true, min: 1970 },
  endYear: { type: Number, required: true, validate: {
    validator: function (value) {
      return value >= this.startYear && value <= new Date().getFullYear();
    },
    message: 'End year must be greater than or equal to start year and less than or equal to the current year'
  }},
});

yearsSchema.plugin(toJSON);
yearsSchema.plugin(paginate);

yearsSchema.statics.isModelTaken = async function (years, excludeUserId) {
  const existingYears = await this.findOne({ years, _id: { $ne: excludeUserId } });
  return !!existingYears;
};

/**
 * @typedef Years
 */
const Years = mongoose.model('Years', yearsSchema);

module.exports = Years;
