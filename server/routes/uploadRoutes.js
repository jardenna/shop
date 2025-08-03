import express from 'express';
import { MAX_FILES } from '../config/constants.js';
import { upload } from '../config/multerConfig.js';
import {
  authenticate,
  authorizeEmployee,
} from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';
import { t } from '../utils/translator.js';

const router = express.Router();

router.post(
  '/',
  languageMiddleware,
  authenticate,
  authorizeEmployee,
  (req, res) => {
    upload.array('images', MAX_FILES)(req, res, (err) => {
      if (err && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).send({
          message: t('fileExceedsSize', req.lang),
        });
      }

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
  },
);

export default router;
