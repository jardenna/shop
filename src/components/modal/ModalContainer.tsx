import type { ReactNode } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { toggleModal } from '../../features/modalSlice';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import type { ModalProps } from './Modal';
import Modal from './Modal';

export type TriggerModalProps = {
  triggerModalBtnContent: ReactNode | string;
  triggerModalBtnVariant?: BtnVariant;
  triggerModalClassName?: string;
  triggerModalDisabled?: boolean;
};

type ModalContainerProps = ModalProps & TriggerModalProps;

const ModalContainer = ({
  id,
  children,
  primaryActionBtn,
  secondaryActionBtn,
  modalSize,
  className,
  triggerModalBtnVariant,
  triggerModalBtnContent,
  modalHeaderText,
  triggerModalClassName,
  triggerModalDisabled,
  onClearAllValues,
  onBoundaryReset,
}: ModalContainerProps) => {
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    if (id) {
      dispatch(toggleModal(id));
    }
  };

  return (
    <>
      <Button
        variant={triggerModalBtnVariant}
        onClick={handleOpenModal}
        className={triggerModalClassName}
        disabled={triggerModalDisabled}
      >
        {triggerModalBtnContent}
      </Button>

      <Modal
        id={id}
        modalHeaderText={modalHeaderText}
        primaryActionBtn={primaryActionBtn}
        secondaryActionBtn={secondaryActionBtn}
        modalSize={modalSize}
        className={className}
        onClearAllValues={onClearAllValues}
        onBoundaryReset={onBoundaryReset}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalContainer;
