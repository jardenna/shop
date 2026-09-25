import { useAppDispatch } from '../../app/hooks';
import { dismissToast, Toastprops } from '../../features/toastSlice';
import BtnClose from '../BtnClose';
import Icon from '../icons/Icon';
import { useToastTimer } from './hooks/useToastTimer';
import { toastTypeConfig } from './toastConfig';

interface ToastItemProps {
  toast: Toastprops;
}

const ToastItem = ({ toast }: ToastItemProps) => {
  const dispatch = useAppDispatch();
  const { iconName, role } = toastTypeConfig[toast.type ?? 'success'];

  const { onMouseEnter, onMouseLeave } = useToastTimer({
    id: toast.id ?? '',
    type: toast.type,
  });

  const handleDeleteToast = () => {
    dispatch(dismissToast(toast.id ?? ''));
  };

  return (
    <li
      role={role}
      className={`toast-item ${toast.type}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="toast-content">
        <Icon iconName={iconName} />
        <p className="toast-message">
          {toast.message} {toast.count && toast.count > 1 && toast.count}
        </p>
      </div>

      <BtnClose onClick={handleDeleteToast} size="1em" />
    </li>
  );
};
export default ToastItem;
