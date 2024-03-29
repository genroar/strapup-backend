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
    model: {
      type: [mongoose.Types.ObjectId],
      default:[]
    },

  },
  {
    timestamps: true,
  }
);



/**
 * @typedef Model
 */
const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
