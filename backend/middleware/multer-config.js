const multer = require('multer');
const SharpMulter  =  require("sharp-multer");

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = SharpMulter({
  destination: (req, file, callback) => callback(null, 'images'),
  imageOptions:{
    fileFormat: "webp ",
    quality: 80,
    resize: { width: 500, height: 500 },
     },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');