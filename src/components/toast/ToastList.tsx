import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { dismissToast, selectToastList } from '../../features/toastSlice';
import Portal from '../Portal';
import './_toast-list.scss';
import ToastItem from './ToastItem';

const ToastList = () => {
  const dispatch = useAppDispatch();
  const toastList = useAppSelector(selectToastList);

  if (toastList.length === 0) {
    return null;
  }

  const deleteToast = (id: string) => {
    dispatch(dismissToast(id));
  };

  return (
    <Portal portalId="toasts">
      <ul className="toast-list">
        {toastList.map((toast) => (
          <ToastItem toast={toast} deleteToast={deleteToast} key={toast.id} />
        ))}
      </ul>
    </Portal>
  );
};

export default ToastList;
