import { useAppDispatch } from '../../app/hooks';
import { closeModal, openModal } from './popModalSlice';

export const usePopModal = () => {
  const dispatch = useAppDispatch();

  const handleOpenModal = (modalId: string) => {
    dispatch(openModal(modalId));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return {
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
  };
};
