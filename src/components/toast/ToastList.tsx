import { useAppSelector } from '../../app/hooks';
import { selectToastList } from '../../features/toastSlice';
import Portal from '../Portal';
import './_toast-list.scss';
import ToastItem from './ToastItem';

const ToastList = () => {
  const toastList = useAppSelector(selectToastList);

  if (toastList.length === 0) {
    return null;
  }

  return (
    <Portal portalId="toasts">
      <ul className="toast-list">
        {toastList.map((toast) => (
          <ToastItem toast={toast} key={toast.id} />
        ))}
      </ul>
    </Portal>
  );
};

export default ToastList;
