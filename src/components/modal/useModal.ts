import { useRef } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { toggleModal } from '../../features/modalSlice';
import useTrapFocus from '../../hooks/useTrapFocus';

const useModal = (modalId: string | null) => {
  const dispatch = useAppDispatch();
  const popupRef = useRef<HTMLDialogElement | null>(null);

  const handleClosePopup = () => {
    dispatch(toggleModal(null));
  };

  useTrapFocus({ id: modalId, popupRef });

  return { onClosePopup: handleClosePopup, popupRef };
};

export default useModal;
