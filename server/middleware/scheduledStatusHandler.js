import { INACTIVE, PUBLISHED, SCHEDULED } from '../config/constants.js';

const scheduledStatusHandler = (statusField) => (req, res, next) => {
  const status = req.body[statusField];
  const { scheduledDate } = req.body;

  if (status === SCHEDULED) {
    if (!scheduledDate) {
      return res.status(400).json({
        success: false,
        message: 'Scheduled status requires a scheduledDate',
      });
    }
    req.body.scheduledDate = scheduledDate; // Keep the scheduledDate
  } else if (status === INACTIVE || status === PUBLISHED) {
    req.body.scheduledDate = undefined; // Clear the scheduledDate
  }

  next();
};

export default scheduledStatusHandler;
