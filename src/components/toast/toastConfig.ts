import { IconName, type IconNameValue } from '../../types/enums';
import type { ToastRole } from '../../types/types';

export type ToastTypes = 'success' | 'info' | 'warning' | 'error';

export const toastTypeConfig: Record<
  ToastTypes,
  { iconName: IconNameValue; role: ToastRole }
> = {
  success: {
    iconName: IconName.Success,
    role: 'status',
  },
  info: {
    iconName: IconName.Info,
    role: 'status',
  },
  warning: {
    iconName: IconName.Warning,
    role: 'alert',
  },
  error: {
    iconName: IconName.Error,
    role: 'alert',
  },
};
