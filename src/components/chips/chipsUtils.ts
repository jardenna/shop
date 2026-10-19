export type ChipVariant = 'success' | 'danger' | 'info' | 'warning' | 'neutral';

export const chipVariants = {
  delivered: 'success',
  published: 'success',
  cancelled: 'danger',
  created: 'info',
  shipped: 'info',
  processing: 'warning',
  scheduled: 'neutral',
  expired: 'neutral',
  inactive: 'neutral',
} as const;

export type ChipStatus = keyof typeof chipVariants;
