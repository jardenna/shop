import { ReactNode } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { toggleModal } from '../../features/modalSlice';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import Modal, { ModalProps } from './Modal';

type ModalContainerProps = ModalProps & {
  triggerModalBtnContent: ReactNode | string;
  triggerModalBtnVariant?: BtnVariant;
};

const ModalContainer = ({
  id,
  children,
  primaryActionBtn,
  secondaryActionBtn,
  triggerModalBtnVariant,
  triggerModalBtnContent,
  modalHeaderText,
  modalSize,
  className,
}: ModalContainerProps) => {
  const dispatch = useAppDispatch();
  const handleOpenModal = () => {
    if (id) {
      dispatch(toggleModal(id));
    }
  };

  return (
    <>
      <Button variant={triggerModalBtnVariant} onClick={handleOpenModal}>
        {triggerModalBtnContent}
      </Button>

      {id && (
        <Modal
          id={id}
          modalHeaderText={modalHeaderText}
          primaryActionBtn={primaryActionBtn}
          secondaryActionBtn={secondaryActionBtn}
          modalSize={modalSize}
          className={className}
        >
          {children}
        </Modal>
      )}
    </>
  );
};

export default ModalContainer;
