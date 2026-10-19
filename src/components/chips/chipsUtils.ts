export type ChipVariant = 'success' | 'danger' | 'info' | 'warning' | 'neutral';

export const chipVariants = {
  delivered: 'success',
  active: 'success',
  published: 'success',
  cancelled: 'danger',
  created: 'info',
  shipped: 'info',
  processing: 'warning',
  scheduled: 'info',
  expired: 'danger',
  inactive: 'neutral',
} as const satisfies Record<string, ChipVariant>;

export type ChipStatus = keyof typeof chipVariants;
