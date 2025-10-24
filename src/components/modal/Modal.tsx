import { useEffect, type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useAppSelector } from '../../app/hooks';
import useLanguage from '../../features/language/useLanguage';
import { selectModalId } from '../../features/modalSlice';
import useClickOutside from '../../hooks/useClickOutside';
import { BtnType, BtnVariant, PopupRole, SizeVariant } from '../../types/enums';
import type { FormEventType } from '../../types/types';
import ErrorBoundaryFallback from '../ErrorBoundaryFallback';
import Overlay from '../overlay/Overlay';
import Portal from '../Portal';
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
  resultSuccess?: boolean | null;
  showBtnLoader?: boolean;
  variant?: BtnVariant;
  onClick?: () => void;
  onSubmit?: (event: FormEventType) => void;
};

export type SecondaryActionBtnProps = {
  label?: string | null;
  variant?: BtnVariant;
  onClick?: () => void;
};

export type ModalActionBtns = {
  primaryActionBtn: PrimaryActionBtnProps;
  secondaryActionBtn?: SecondaryActionBtnProps | null;
};

export type ModalProps = ModalActionBtns & {
  children: ReactNode;
  id: string;
  modalHeaderText: string;
  className?: string;
  isAlert?: boolean;
  modalInfo?: ReactNode;
  modalSize?: SizeVariant;
  showCloseIcon?: boolean;
  onBoundaryReset?: () => void;
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
  onBoundaryReset,
}: ModalProps) => {
  const { language } = useLanguage();
  const modalId = useAppSelector(selectModalId);
  const { closeModalState, popupRef } = useModal(modalId);

  const { closeModalAnimated, popupClass } = useVisibility(
    modalId === id,
    closeModalState,
    onClearAllValues,
  );

  useClickOutside(popupRef, () => {
    closeModalAnimated();
    onClearAllValues?.();
  }, [popupRef]);

  useEffect(() => {
    if (primaryActionBtn.resultSuccess === true && modalId === id) {
      closeModalAnimated();
      onClearAllValues?.();
    }
  }, [
    primaryActionBtn.resultSuccess,
    modalId,
    id,
    closeModalAnimated,
    onClearAllValues,
  ]);

  if (modalId !== id || !modalId) {
    return null;
  }

  const handlePrimaryClick = () => {
    if (primaryActionBtn.onClick) {
      primaryActionBtn.onClick();
      closeModalAnimated();
    }
    if (
      primaryActionBtn.closeOnClick !== false &&
      primaryActionBtn.resultSuccess === undefined
    ) {
      closeModalAnimated();
      if (onClearAllValues) {
        onClearAllValues();
      }
    }
  };

  const handleClose = () => {
    if (secondaryActionBtn && secondaryActionBtn.onClick) {
      secondaryActionBtn.onClick();
    }
    closeModalAnimated();
  };

  const handleErrorBoundaryReset = () => {
    handleClose();
    onBoundaryReset?.();
  };

  const ModalContent = (
    <article>
      <ModalHeader
        modalHeadertext={modalHeaderText}
        onCloseModal={closeModalAnimated}
        showCloseIcon={showCloseIcon}
        ariaLabel={language.dialog}
      />
      {/* Is modal body a form? */}
      {primaryActionBtn.buttonType === BtnType.Submit ? (
        <form
          noValidate
          className="modal-form modal-content"
          onSubmit={primaryActionBtn.onSubmit}
        >
          {children}
          <ModalFooter
            primaryActionBtn={primaryActionBtn}
            secondaryActionBtn={secondaryActionBtn}
            onCloseModal={handleClose}
            onPrimaryClick={handlePrimaryClick}
            ariaLabel={language.dialog}
          />
        </form>
      ) : (
        <>
          <div className="modal-content">{children}</div>
          <ModalFooter
            primaryActionBtn={primaryActionBtn}
            secondaryActionBtn={secondaryActionBtn}
            onCloseModal={handleClose}
            onPrimaryClick={handlePrimaryClick}
            ariaLabel={language.dialog}
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
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={handleErrorBoundaryReset}
        >
          {ModalContent}
        </ErrorBoundary>
      </dialog>
      <Overlay />
    </Portal>
  );
};

export default Modal;
