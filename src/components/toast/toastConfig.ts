import { ToastTypes } from '../../features/toastSlice';
import { IconName } from '../../types/enums';
import { ToastRole } from '../../types/types';

export const toastTypeConfig: Record<
  ToastTypes,
  { iconName: IconName; role: ToastRole }
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
