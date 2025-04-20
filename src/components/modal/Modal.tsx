import { ReactNode } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectModalId } from '../../features/modalSlice';
import useClickOutside from '../../hooks/useClickOutside';
import useMediaQuery from '../../hooks/useMediaQuery ';
import { BtnVariant, PopupRole, SizeVariant } from '../../types/enums';
import { ButtonType } from '../../types/types';
import Overlay from '../overlay/Overlay';
import Portal from '../Portal';
import SwipeContainer from '../SwipeContainer';
import './_modal.scss';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import useModal from './useModal';
import useVisibility from './useVisibility';

export type PrimaryActionBtnProps = {
  label: string | null;
  buttonType?: ButtonType;
  className?: string;
  disabled?: boolean;
  variant?: BtnVariant;
  onClick: () => void;
};

export type SecondaryActionBtnProps = {
  label: string | null;
  variant?: BtnVariant;
  onClick?: () => void;
};

export type ModalProps = {
  children: ReactNode;
  id: string;
  modalHeaderText: string;
  primaryActionBtn: PrimaryActionBtnProps;
  className?: string;
  isAlert?: boolean;
  modalInfo?: ReactNode;
  modalSize?: SizeVariant;
  secondaryActionBtn?: SecondaryActionBtnProps;
  showCloseIcon?: boolean;
};

const Modal = ({
  id,
  modalHeaderText,
  children,
  isAlert,
  modalSize = SizeVariant.Sm,
  className = '',
  showCloseIcon,
  secondaryActionBtn,
  primaryActionBtn,
  modalInfo,
}: ModalProps) => {
  const { isMobileSize } = useMediaQuery();
  const modalId = useAppSelector(selectModalId);
  const { handleCloseModal, modalRef } = useModal(modalId);

  const { handleClosePopup, popupClass } = useVisibility(
    modalId === id,
    handleCloseModal,
  );

  useClickOutside(modalRef, () => {
    handleClosePopup();
  }, [modalRef]);

  if (!modalId) {
    return null;
  }

  const ModalContent = (
    <>
      <ModalHeader
        modalHeadertext={modalHeaderText}
        onCloseModal={handleClosePopup}
        showCloseIcon={showCloseIcon}
      />
      {primaryActionBtn.buttonType !== 'submit' ? (
        <>
          <div className="modal-body">{children}</div>
          <ModalFooter
            onCloseModal={handleClosePopup}
            primaryActionBtn={primaryActionBtn}
            secondaryActionBtn={secondaryActionBtn}
          />
        </>
      ) : (
        <form
          method="modal"
          className="modal-form"
          onSubmit={primaryActionBtn.onClick}
        >
          {children}
          <ModalFooter
            onCloseModal={handleClosePopup}
            primaryActionBtn={primaryActionBtn}
            secondaryActionBtn={secondaryActionBtn}
          />
        </form>
      )}
      {modalInfo && modalInfo}
    </>
  );

  return (
    <Portal portalId="modal">
      <dialog
        ref={modalRef}
        className={`modal modal-${modalSize} ${className} ${popupClass} ${isMobileSize ? 'animate-top-right' : 'animate-top-center'}`}
        role={isAlert ? PopupRole.Alert : undefined}
      >
        {isMobileSize ? (
          <SwipeContainer onSwipeRight={handleClosePopup}>
            {ModalContent}
          </SwipeContainer>
        ) : (
          ModalContent
        )}
      </dialog>
      <Overlay />
    </Portal>
  );
};

export default Modal;
