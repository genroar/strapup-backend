// controllers/imageController.js

import uploadImageToCloudinary from '../services/cloudinaryService';

const uploadImage = async (req, res) => {
  try {
    const result = await uploadImageToCloudinary('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {
      public_id: 'olympic_flag',
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

export default uploadImage;
