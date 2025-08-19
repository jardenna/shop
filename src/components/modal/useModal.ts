import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { useAppDispatch } from '../../app/hooks';
import { toggleModal } from '../../features/modalSlice';
import useTrapFocus from '../../hooks/useTrapFocus';

const useModal = (modalId: string | null) => {
  const dispatch = useAppDispatch();
  const popupRef = useRef<HTMLDialogElement | null>(null);
  const location = useLocation();

  const handleClosePopup = () => {
    dispatch(toggleModal(null));
  };

  useEffect(() => {
    if (modalId) {
      handleClosePopup();
    }
  }, [location, dispatch]);

  useTrapFocus({ id: modalId, popupRef });

  return { onClosePopup: handleClosePopup, popupRef };
};

export default useModal;
