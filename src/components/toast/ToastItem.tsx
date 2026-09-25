import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { dismissToast, Toastprops } from '../../features/toastSlice';
import BtnClose from '../BtnClose';
import Icon from '../icons/Icon';
import { toastTypeConfig } from './toastConfig';

interface ToastItemProps {
  toast: Toastprops;
}

const ToastItem = ({ toast }: ToastItemProps) => {
  const dispatch = useAppDispatch();
  const { iconName, role } = toastTypeConfig[toast.type ?? 'success'];

  const [isHovered, setIsHovered] = useState(false);
  const autoHideDuration = 5000;

  useEffect(() => {
    if (toast.type === 'error' || isHovered) {
      return;
    }

    const timer = setTimeout(() => {
      dispatch(dismissToast(toast.id ?? ''));
    }, autoHideDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, isHovered, toast.id, toast.type]);

  const handleDeleteToast = () => {
    dispatch(dismissToast(toast.id ?? ''));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <li
      role={role}
      className={`toast-item ${toast.type}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
