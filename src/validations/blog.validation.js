const Joi = require('joi');

const addBlog = {
body: Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  metaDescription: Joi.string(),
  photos: Joi.array().items(Joi.string()),
  categories: Joi.array().items(Joi.string()),
  featuredImage: Joi.string(),
  active: Joi.boolean().default(true)
})
};
const updateBlog = {
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    metaDescription: Joi.string(),
    photos: Joi.array().items(Joi.string()),
    categories: Joi.array().items(Joi.string()),
    featuredImage: Joi.string(),
    active: Joi.boolean()
  })
}

const getAllBlogs = {
  query: Joi.object().keys({
  active: Joi.boolean(),
  category: Joi.string()
})
}

module.exports = { addBlog, updateBlog, getAllBlogs};
