const scheduledStatusHandler = (req, res, next) => {
  const { status, scheduledDate } = req.body;

  if (status === 'Scheduled') {
    if (!scheduledDate) {
      return res.status(400).json({
        success: false,
        message: 'Scheduled status requires a scheduledDate',
      });
    }
    req.body.scheduledDate = scheduledDate; // Keep the scheduledDate
  } else if (status === 'Inactive' || status === 'Published') {
    req.body.scheduledDate = undefined; // Clear the scheduledDate
  }

  next();
};

export default scheduledStatusHandler;
