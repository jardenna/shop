import express from 'express';
import { MAX_FILES } from '../config/constants.js';
import upload from '../config/multerConfig.js';
import { uploadImages } from '../controllers/adminProductController.js';
import {
  authenticate,
  authorizeEmployee,
} from '../middleware/authMiddleware.js';
import languageMiddleware from '../middleware/languageMiddleware.js';

const router = express.Router();

router.post(
  '/',
  languageMiddleware,
  authenticate,
  authorizeEmployee,
  (req, res) => {
    upload.array('images', MAX_FILES)(req, res, (err) => {
      return uploadImages(req, res, err);
    });
  },
);

export default router;
