const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const AddProductSchema = mongoose.Schema(
  {
    vendor_id: {
      type: String,
      required: true,
    },
    store_id: {
      type: String,
      required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true, 
    },
    price : {
        type: String,
        required: true, 
    },
    discount: {
        type: String,
        required: true, 
    },
    category_id: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    country_logo: {
        type: string,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
    date : {
        type: String,
        required: true,
    },
    condition : {
        type: String,
        required: true,
    },
    case_material : {
        type: String,
        required: true,
    },
    box_papers : {
        type: String,
        required: true,
    }
    
  }
);

AddProductSchema.plugin(toJSON);

/**
 * @typedef AddProduct
 */
const AddProduct = mongoose.model('AddProduct', AddProductSchema);

module.exports = AddProduct;
