import { useAppDispatch } from '../../app/hooks';
import { closeModal, openModal } from '../../features/modalSlice';

export const useModal = () => {
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
