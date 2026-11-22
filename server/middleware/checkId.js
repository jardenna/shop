import { isValidObjectId } from 'mongoose';

const checkId =
  (paramName = 'id') =>
  (req, res, next) => {
    if (!isValidObjectId(req.params[paramName])) {
      console.log('error');
    }

    next();
  };

export default checkId;
