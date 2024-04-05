const Blog = require('../models/blog.model');
const ApiError = require('../utils/ApiError');
const cloudinaryService = require('./cloudinaryService');
const httpStatus = require('http-status');



// Create Blog

const addBlog = async (blogBody) => {

  let imageUrls = [];
  let featuredImageUrl = null;

  if (Array.isArray(blogBody.photos)) {
    imageUrls = await Promise.all(blogBody.photos.map(async (photo) => {
      return await cloudinaryService.uploadImage(photo, { folder: 'blogs' });
    }));
  } else {
    imageUrls.push(await cloudinaryService.uploadImage(blogBody.photos, { folder: 'blogs' }));
  }

  if (blogBody.featuredImage) {
    featuredImageUrl = await cloudinaryService.uploadImage(blogBody.featuredImage, { folder: 'blogs' });
  }

  const blogData = { ...blogBody, photos: imageUrls, featuredImage: featuredImageUrl };
  return Blog.create(blogData);

};


// Update Blog

const updateBlog = async (id, updateBody) => {
  try {
  const blogs = await Blog.findById(id);
  if (!blogs) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  
  Object.assign(blogs, updateBody);

  if (Array.isArray(updateBody.photos)) {
    try {
      let imageUrl = null;
      imageUrl = await Promise.all(updateBody.photos.map(async (photo) => {
        return await cloudinaryService.uploadImage(photo, { folder: 'blogs' });
      }));
      blogs.photos = imageUrl;
    } catch {

    }
  }else {
    try{
      let imageUrl = null;
      imageUrl.push(await cloudinaryService.uploadImage(updateBody.photos, { folder: 'blogs' }));
      blogs.photos =imageUrl;
    }catch {

    }
  }
  if (updateBody.featuredImage) {
    let featuredImageURL = null;
    try{
      featuredImageURL = await cloudinaryService.uploadImage(updateBody.featuredImage, { folder: 'blogs' });
      blogs.featuredImage = featuredImageURL;
    }catch{}
  }
  await blogs.save();
  return blogs;
}catch (error) {
  console.error("Error updating blog:", error);
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error updating blog', error);
}
}


// Get All Blog

  const getAllBlogs = async ({ active, category }) => {
    const query = {};
    if (active !== undefined) query.active = active;
    if (category) query.categories = category;
    return Blog.find(query);
  };

// Get Blog By Id

  const getBlogById = async (id) => {
    return Blog.findById(id);
  };

// Delete Blog

  const deleteBlogById = async (id) => {
    return Blog.findByIdAndDelete(id);
  };

  module.exports = { addBlog, updateBlog, getAllBlogs, getBlogById, deleteBlogById };
