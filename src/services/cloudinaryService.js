const cloudinary = require("../config/cloudinaryConfig");




const uploadImage = async (imageFile, options) => {
  try {
    console.log("I came here")
    console.log(cloudinary)
    const cloudinaryResponse = await cloudinary.cloudinary.uploader.upload(imageFile, options);
    return cloudinaryResponse.secure_url;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

module.exports = {
  uploadImage
};
