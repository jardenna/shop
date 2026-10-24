import { GOAL_DAYS } from '../config/constants.js';
import { t } from '../utils/translator.js';

const validatePeriodMiddleware = (req, res, next) => {
  const period = Number(req.params.id);

  if (!GOAL_DAYS.includes(period)) {
    return res.status(400).json({
      success: false,
      message: t('pleaseEnterValidPeriod', req.lang),
    });
  }

  req.period = period;

  next();
};

export default validatePeriodMiddleware;
