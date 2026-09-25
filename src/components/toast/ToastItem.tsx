import { Toastprops } from '../../features/toastSlice';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import Icon from '../icons/Icon';
import { toastTypeConfig } from './toastConfig';

interface ToastItemProps {
  toast: Toastprops;
  deleteToast: (id: string) => void;
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

      <Button
        variant={BtnVariant.Ghost}
        onClick={() => {
          console.log('Clicked ID:', toast.id);
          deleteToast(toast.id ?? '');
        }}
      >
        Delete {toast.id}
      </Button>
    </li>
  );
};

export default ToastItem;
