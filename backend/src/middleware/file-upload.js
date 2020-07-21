const { v1: uuid } = require("uuid");
const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: 50000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "src/public/images/products");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, file.originalname.slice(0, 11) + uuid() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    console.log(file);
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("invalid mine type");
    cb(error, isValid);
  },
});

module.exports = fileUpload;
