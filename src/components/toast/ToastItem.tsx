import { useLanguage } from '../../features/language/useLanguage';
import { Toastprops } from '../../features/toastSlice';
import { IconName } from '../../types/enums';
import IconBtn from '../IconBtn';
import Icon from '../icons/Icon';
import { toastTypeConfig } from './toastConfig';

interface ToastItemProps {
  toast: Toastprops;
  deleteToast: (id: string) => void;
}

const ToastItem = ({ toast, deleteToast }: ToastItemProps) => {
  const { language } = useLanguage();
  const { iconName, role } = toastTypeConfig[toast.type ?? 'success'];

  const handleDeleteToast = () => {
    deleteToast(toast.id ?? '');
  };

  return (
    <li role={role} className={`toast-item ${toast.type}`}>
      <div className="toast-content">
        <Icon iconName={iconName} />
        <p className="toast-message">
          {toast.message} {toast.count && toast.count > 1 && toast.count}
        </p>
      </div>

      <IconBtn
        iconName={IconName.Close}
        ariaLabel={language.close}
        onClick={handleDeleteToast}
      />
    </li>
  );
};

export default ToastItem;
