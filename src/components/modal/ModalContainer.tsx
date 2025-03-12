import { FC, ReactNode } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { toggleModal } from '../../features/modalSlice';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import Modal, { PrimaryActionBtnProps, SecondaryActionBtnProps } from './Modal';

interface ModalContainerProps {
  children: ReactNode;
  id: string | null;
  primaryActionBtn: PrimaryActionBtnProps;
  triggerModalBtnContent: ReactNode | string;
  secondaryActionBtn?: SecondaryActionBtnProps;
  triggerModalBtnVariant?: BtnVariant;
}

const ModalContainer: FC<ModalContainerProps> = ({
  id,
  children,
  primaryActionBtn,
  secondaryActionBtn,
  triggerModalBtnVariant,
  triggerModalBtnContent,
}) => {
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
          modalHeaderText="header"
          primaryActionBtn={primaryActionBtn}
          secondaryActionBtn={secondaryActionBtn}
          showCloseIcon
        >
          {children}
        </Modal>
      )}
    </>
  );
};

export default ModalContainer;
