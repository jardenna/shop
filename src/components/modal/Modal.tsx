import { ReactNode } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectModalId } from '../../features/modalSlice';
import useClickOutside from '../../hooks/useClickOutside';
import useMediaQuery from '../../hooks/useMediaQuery ';
import { BtnType, BtnVariant, PopupRole, SizeVariant } from '../../types/enums';
import type { FormEventType } from '../../types/types';
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
  buttonType?: BtnType;
  className?: string;
  closeOnClick?: boolean;
  disabled?: boolean;
  variant?: BtnVariant;
  onClick?: () => void;
  onSubmit?: (event: FormEventType) => void;
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
  onClearAllValues?: () => void;
};

const Modal = ({
  id,
  modalHeaderText,
  children,
  primaryActionBtn,
  secondaryActionBtn,
  showCloseIcon,
  modalSize = SizeVariant.Sm,
  className = '',
  isAlert,
  modalInfo,
  onClearAllValues,
}: ModalProps) => {
  const { isMobileSize } = useMediaQuery();
  const modalId = useAppSelector(selectModalId);
  const { onClosePopup, popupRef } = useModal(modalId);

  const { onCloseModal, popupClass } = useVisibility(
    modalId === id,
    onClosePopup,
    onClearAllValues,
  );

  useClickOutside(popupRef, () => {
    onCloseModal();
    if (onClearAllValues) {
      onClearAllValues();
    }
  }, [popupRef]);

  if (modalId !== id || !modalId) {
    return null;
  }

  const handlePrimaryClick = () => {
    if (primaryActionBtn.onClick) {
      primaryActionBtn.onClick();
      onClosePopup();
    }

    if (primaryActionBtn.closeOnClick !== false) {
      onCloseModal();
      if (onClearAllValues) {
        onClearAllValues();
      }
    }
  };

  const ModalContent = (
    <article>
      <ModalHeader
        modalHeadertext={modalHeaderText}
        onCloseModal={onCloseModal}
        showCloseIcon={showCloseIcon}
      />
      {/* Is modal body a form? */}
      {primaryActionBtn.buttonType === BtnType.Submit ? (
        <form className="modal-form" onSubmit={primaryActionBtn.onSubmit}>
          {children}
          <ModalFooter
            primaryActionBtn={primaryActionBtn}
            secondaryActionBtn={secondaryActionBtn}
            onCloseModal={onCloseModal}
            onPrimaryClick={handlePrimaryClick}
          />
        </form>
      ) : (
        <>
          <div className="modal-content">{children}</div>
          <ModalFooter
            primaryActionBtn={primaryActionBtn}
            secondaryActionBtn={secondaryActionBtn}
            onCloseModal={onCloseModal}
            onPrimaryClick={handlePrimaryClick}
          />
        </>
      )}
      {modalInfo && modalInfo}
    </article>
  );

  return (
    <Portal portalId="modal">
      <dialog
        ref={popupRef}
        className={`modal modal-${modalSize} ${className} ${popupClass} animate-top-center`}
        role={isAlert ? PopupRole.Alert : undefined}
      >
        {isMobileSize ? (
          <SwipeContainer onSwipeRight={onCloseModal}>
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
