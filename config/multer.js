var multer = require("multer");

// MULTER CONFIGURATION
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/tmp');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single("image");

module.exports = upload;