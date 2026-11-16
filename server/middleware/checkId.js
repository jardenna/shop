import { isValidObjectId } from 'mongoose';
import { t } from '../utils/translator.js';

const checkId =
  (paramName = 'id') =>
  (req, res, next) => {
    if (!isValidObjectId(req.params[paramName])) {
      return res.status(404).json({
        success: false,
        message: t('resourceNotFound', req.lang),
      });
    }

    next();
  };

export default checkId;
