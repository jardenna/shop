import { useAppSelector } from '../../app/hooks';
import { selectToastList } from '../../features/toastSlice';
import Portal from '../Portal';
import './_toast-list.scss';

const ToastList = () => {
  const toastList = useAppSelector(selectToastList);

  return (
    <Portal portalId="toasts">
      {toastList.map((toast) => (
        <ul className="toast-list" key={toast.id}>
          <li className="toast-item">{toast.message}</li>
        </ul>
      ))}
    </Portal>
  );
};

export default ToastList;
