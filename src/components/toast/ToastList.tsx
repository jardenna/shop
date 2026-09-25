import { useAppSelector } from '../../app/hooks';
import { selectToastList } from '../../features/toastSlice';
import Portal from '../Portal';
import './_toast-list.scss';
import ToastItem from './ToastItem';

const ToastList = () => {
  const toastList = useAppSelector(selectToastList);
  const deleteToast = () => {
    console.log(123);
  };

  return (
    <Portal portalId="toasts">
      {toastList.map((toast) => (
        <ul className="toast-list" key={toast.id}>
          <ToastItem toast={toast} deleteToast={deleteToast} />
        </ul>
      ))}
    </Portal>
  );
};

export default ToastList;
