import { Toastprops } from '../../features/toastSlice';
import BtnClose from '../BtnClose';
import Icon from '../icons/Icon';
import { toastTypeConfig } from './toastConfig';

interface ToastItemProps {
  toast: Toastprops;
  deleteToast: () => void;
}

const ToastItem = ({ toast, deleteToast }: ToastItemProps) => {
  const { iconName, role } = toastTypeConfig[toast.type ?? 'success'];

  return (
    <li role={role} className={`toast-item ${toast.type}`}>
      <div className="toast-content">
        <Icon iconName={iconName} />
        <p className="toast-message">
          {toast.message} {toast.count && toast.count > 1 && toast.count}
        </p>
      </div>

      <BtnClose onClick={deleteToast} />
    </li>
  );
};

export default ToastItem;
