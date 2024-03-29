// config/cloudinaryConfig.js

const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dupqwe9dp', 
  api_key: '691928634239212', 
  api_secret: 'O_0DL7h5BVHlKNfGfe8bHgPnPfg' 
});


module.exports={
    cloudinary,
}