import { FC, ReactNode } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectModalId } from '../../features/modalSlice';
import useClickOutside from '../../hooks/useClickOutside';
import useMediaQuery from '../../hooks/useMediaQuery ';
import { BtnVariant, PopupRole, SizeVariant } from '../../types/enums';
import { BtnType } from '../../types/types';
import Overlay from '../overlay/Overlay';
import Portal from '../Portal';
import SwipeContainer from '../SwipeContainer';
import './_modal.scss';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import useModal from './useModal';
import useVisibility from './useVisibility';

export interface PrimaryActionBtnProps {
  label: string | null;
  buttonType?: BtnType;
  className?: string;
  variant?: BtnVariant;
  onClick: () => void;
}

export interface SecondaryActionBtnProps {
  label: string | null;
  variant?: BtnVariant;
  onClick?: () => void;
}

export interface ModalProps {
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
}

const Modal: FC<ModalProps> = ({
  id,
  modalHeaderText,
  children,
  isAlert,
  modalSize = 'sm',
  className = '',
  showCloseIcon,
  secondaryActionBtn,
  primaryActionBtn,
  modalInfo,
}) => {
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
