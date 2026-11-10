import { ReactNode, useId, useRef } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useLanguage } from '../../features/language/useLanguage';
import { selectModalId } from '../../features/modalSlice';
import { useAnimate } from '../../hooks/useAnimate';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useMoveFocus } from '../../hooks/useMoveFocus';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useTrapFocus } from '../../hooks/useTrapFocus';
import { SizeVariant } from '../../types/types';
import CloseBtn from '../CloseBtn';
import Overlay from '../overlay/Overlay';
import Portal from '../Portal';
import './_modal.scss';
import { useModal } from './useModal';

export interface BaseModalProps {
  ariaControls: string;
  children: ReactNode;
  modalId: string;
  className?: string;
}

export interface ModalProps extends BaseModalProps {
  headerText: string;
  isAlert?: boolean;
  modalSize?: SizeVariant;
  showCloseBtn?: boolean;
  onClearAllValues?: () => void;
}

const Modal = ({
  children,
  isAlert,
  modalId,
  headerText,
  showCloseBtn,
  modalSize = 'small',
  className = '',
  ariaControls,
  onClearAllValues,
}: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const { language } = useLanguage();

  const currentModalId = useAppSelector(selectModalId);
  const isModalOpen = currentModalId === modalId;

  const { shouldRender, transitionState, onTransitionEnd } = useAnimate({
    isOpen: isModalOpen,
  });

  const { closeModal } = useModal();

  const closePopup = () => {
    onClearAllValues?.();
    closeModal();
  };

  useMoveFocus({
    closePopup,
    isPopupOpen: isModalOpen,
  });

  useScrollLock(shouldRender);
  useClickOutside(modalRef, closePopup, [modalRef]);
  useTrapFocus({
    popupRef: modalRef,
    enabled: shouldRender,
  });

  if (!shouldRender) {
    return null;
  }

  return (
    <Portal portalId={modalId}>
      <dialog
        id={ariaControls}
        aria-labelledby={dialogId}
        ref={modalRef}
        className={`modal transition from-top-center modal-${modalSize} ${className} ${transitionState}`}
        onTransitionEnd={(event) => {
          if (event.target === event.currentTarget) {
            onTransitionEnd();
          }
        }}
        role={isAlert ? 'alertdialog' : undefined}
      >
        <header className="modal-header">
          <h2 className="modal-title" id={dialogId}>
            {headerText}
          </h2>
          {showCloseBtn && (
            <CloseBtn onClick={closePopup} ariaLabel={language.closeDialog} />
          )}
        </header>

        <div className="modal-content">{children}</div>
      </dialog>

      <Overlay isOverlayShown={shouldRender} />
    </Portal>
  );
};

export default Modal;
