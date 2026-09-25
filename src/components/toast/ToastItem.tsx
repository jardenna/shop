import { useAppDispatch } from '../../app/hooks';
import { dismissToast, ToastItemProps } from '../../features/toastSlice';
import BtnClose from '../BtnClose';
import Icon from '../icons/Icon';
import { useToastTimer } from './hooks/useToastTimer';
import { toastTypeConfig } from './toastConfig';

const ToastItem = ({ id, type, count, message }: ToastItemProps) => {
  const dispatch = useAppDispatch();
  const { iconName, role } = toastTypeConfig[type];

  const { onMouseEnter, onMouseLeave } = useToastTimer({
    id,
    type,
  });

  const handleDeleteToast = () => {
    dispatch(dismissToast(id));
  };

  return (
    <li
      role={role}
      className={`toast-item ${type}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="toast-content">
        <Icon iconName={iconName} />
        <p className="toast-message">
          {message} {count && count > 1 && count}
        </p>
      </div>

      <BtnClose onClick={handleDeleteToast} size="1em" />
    </li>
  );
};

export default ToastItem;
