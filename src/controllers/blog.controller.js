const httpStatus = require('http-status');
const blogService = require('../services/blog.service');

const addBlog = async (req, res) => {
  try {
    let photos = null;
    let featuredImage = null;
    if (req.files && req.files['photos']) {
      photos = req.files['photos'].map(file => file.path);
    }

    if (req.files && req.files['featuredImage']) {
      featuredImage = req.files['featuredImage'][0].path;
    }
    const blog = await blogService.addBlog({
      ...req.body,
      photos: photos,
      featuredImage: featuredImage
    });
    res.status(httpStatus.CREATED).json(blog);
  } catch (error) {
    console.error('Error adding blog:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

const updateBlog = async (req, res, next) => {
  try {
    let blogData = { ...req.body };
    if (req.files && req.files['photos']) {
      blogData.photos = req.files['photos'].map(file => file.path);
    }
    // Check if req.files exists and if 'featuredImage' is present
    if (req.files && req.files['featuredImage']) {
      blogData.featuredImage = req.files['featuredImage'][0].path;
    }
    const blog = await blogService.updateBlog(req.params.id, blogData);
    res.status(httpStatus.OK).json(blog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const { active, category } = req.query;
    const blogs = await blogService.getAllBlogs({ active, category });
    res.status(httpStatus.OK).json(blogs);
  } catch (error) {
    console.error('Error getting all blogs:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogService.getBlogById(id);
    res.status(httpStatus.OK).json(blog);
  } catch (error) {
    console.error('Error getting blog by id:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    await blogService.deleteBlogById(id);
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    console.error('Error deleting blog by id:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

module.exports = { addBlog, updateBlog, getAllBlogs, getBlogById, deleteBlogById };
