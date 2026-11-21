import type { IconNameValue, PopupRole } from '../../shared/types';

export type ToastTypes = 'success' | 'info' | 'warning' | 'error';

export const toastTypeConfig: Record<
  ToastTypes,
  { iconName: IconNameValue; role: PopupRole }
> = {
  success: {
    iconName: 'success',
    role: 'status',
  },
  info: {
    iconName: 'info',
    role: 'status',
  },
  warning: {
    iconName: 'warning',
    role: 'alert',
  },
  error: {
    iconName: 'error',
    role: 'alert',
  },
};
