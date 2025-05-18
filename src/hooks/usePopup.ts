import { useRef } from 'react';
import { useAppDispatch } from '../app/hooks';
import { toggleModal } from '../features/modalSlice';
import useTrap from './useTrap';

const usePopup = (modalId: string | null) => {
  const dispatch = useAppDispatch();
  const popupRef = useRef<HTMLDialogElement | null>(null);

  const handleClosePopup = () => {
    dispatch(toggleModal(null));
  };

  useTrap(modalId, popupRef);

  return { onClosePopup: handleClosePopup, popupRef };
};

export default usePopup;
