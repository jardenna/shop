import multer from 'multer';
import path from 'path';
import { t } from '../utils/translator.js';
import { MAX_FILE_SIZE } from './constants.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'public/images/uploads'));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp|avif/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp|image\/avif/;
  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  const fileName = file.originalname;
  const extension = fileName.split('.').pop()?.toLowerCase();

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `${extension} ${t('unsupportedFile', req.lang)}. ` +
          `${t('allowedFormats', req.lang)}: JPEG, JPG, PNG, WEBP, AVIF.`,
      ),
    );
  }
};

const fileSize = MAX_FILE_SIZE;

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize },
});

export default upload;
