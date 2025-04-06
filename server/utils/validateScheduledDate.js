const validateScheduledDate = (categoryStatus, scheduledDate) => {
  if (categoryStatus === 'Scheduled') {
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
        message: 'Scheduled date must be after today',
      };
    }
  }
  return { success: true };
};

export default validateScheduledDate;
