const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');



const blogSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        metaDescription: { type: String },
        photos: [{ type: String }],
        categories: [{ type: String }],
        featuredImage: { type: String },
        active: { type: Boolean, default: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    {
        timestamps: true,
    }
);




blogSchema.plugin(toJSON);
blogSchema.plugin(paginate);

blogSchema.statics.isBlogTaken = async function (blog, excludeUserId) {
  const blogs = await this.findOne({ blog, _id: { $ne: excludeUserId } });
  return !!blogs;
};

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
