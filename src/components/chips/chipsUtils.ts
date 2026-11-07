export type ChipVariant = 'success' | 'danger' | 'info' | 'warning' | 'neutral';

type ChipVariantMap = Record<string, ChipVariant>;

export const chipVariants: ChipVariantMap = {
  delivered: 'success',
  active: 'success',
  read: 'success',
  current: 'success',
  published: 'success',
  cancelled: 'danger',
  unRead: 'danger',
  created: 'info',
  shipped: 'info',
  processing: 'warning',
  scheduled: 'info',
  expired: 'danger',
  inactive: 'neutral',
};

export type ChipStatus = keyof typeof chipVariants;
