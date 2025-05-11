import multer from 'multer';
import path from 'path';
import { t } from '../utils/translator.js';
import { MAX_FILE_SIZE } from './constants.js';

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

const fileSize = MAX_FILE_SIZE;

export const upload = multer({ storage, fileFilter, limits: { fileSize } });
