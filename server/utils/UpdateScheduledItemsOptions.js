import { PUBLISHED } from '../config/constants.js';

async function updateScheduledItems({
  items,
  model,
  now = new Date(),
  statusKey,
  dateKey = 'scheduledDate',
}) {
  const updates = await Promise.all(
    items.map(async (item) => {
      if (
        item[statusKey] === 'Scheduled' &&
        item[dateKey] &&
        item[dateKey] <= now
      ) {
        await model.findByIdAndUpdate(item._id, {
          $set: { [statusKey]: PUBLISHED },
          $unset: { [dateKey]: '' },
        });

        item[statusKey] = PUBLISHED;
        item[dateKey] = undefined;
      }
      return item;
    }),
  );

  return updates;
}

export { updateScheduledItems };
