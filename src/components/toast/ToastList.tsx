import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectToastList, startToastExit } from '../../features/toastSlice';
import { useKeyPress } from '../../hooks/useKeyPress';
import { KeyCode } from '../../types/enums';
import Portal from '../Portal';
import './_toast-list.scss';
import ToastItem from './ToastItem';

const ToastList = () => {
  const toastList = useAppSelector(selectToastList);
  const dispatch = useAppDispatch();
  const toastListRef = useRef<HTMLUListElement>(null);

  const handleCloseAllToasts = () => {
    toastList.forEach((toast) => {
      if (!toast.isExiting && toast.id) {
        dispatch(startToastExit(toast.id));
      }
    });
  };

  useKeyPress(handleCloseAllToasts, [KeyCode.Esc]);

  if (toastList.length === 0) {
    return null;
  }

  return (
    <Portal portalId="toasts">
      <ul className="toast-list" ref={toastListRef}>
        {toastList.map((toast) => (
          <ToastItem
            message={toast.message}
            key={toast.id}
            id={toast.id ?? ''}
            type={toast.type ?? 'success'}
            count={toast.count}
            isExiting={toast.isExiting ?? false}
          />
        ))}
      </ul>
    </Portal>
  );
};

export default ToastList;
