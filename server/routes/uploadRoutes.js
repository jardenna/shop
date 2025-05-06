import express from 'express';
import multer from 'multer';
import path from 'path';
import { t } from '../utils/translator.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: './public/images/uploads',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp|gif/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  const fileName = file.originalname;
  const splitFileName = fileName.split('.')[1];

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    return cb(
      new Error(
        `${splitFileName} ${t('unsupportedFile', req.lang)} . 
        ${t('allowedFormats', req.lang)}: JPEG, JPG, PNG, WEBP, GIF.`,
      ),
    );
  }
};

const fileSize = 1 * 1000 * 1000;
const upload = multer({ storage, fileFilter, limits: { fileSize } });

router.post('/', (req, res) => {
  upload.array('images', 5)(req, res, (err) => {
    // '5' er max files limit
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.files) {
      const filePaths = req.files.map((file) => `/${file.path}`);
      res.status(200).send({
        success: true,
        message: 'Images uploaded successfully',
        images: filePaths,
      });
    } else {
      res.status(400).send({ message: 'No image files provided' });
    }
  });
});

export default router;
