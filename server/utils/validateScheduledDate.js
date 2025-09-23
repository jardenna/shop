import { SCHEDULED } from '../config/constants.js';
import { t } from '../utils/translator.js';

const validateScheduledDate = (categoryStatus, scheduledDate, lang) => {
  if (categoryStatus === SCHEDULED) {
    if (!scheduledDate) {
      return {
        success: false,
        message: 'Please provide a scheduled date',
      };
    }
    if (isNaN(Date.parse(scheduledDate))) {
      return {
        success: false,
        message: 'Invalid scheduled date format',
      };
    }
    if (new Date(scheduledDate) <= new Date()) {
      return {
        success: false,
        message: t('scheduledDateMustBeFuture', lang),
      };
    }
  }
  return { success: true };
};

export default validateScheduledDate;
