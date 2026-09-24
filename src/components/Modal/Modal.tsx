import { ReactNode, useId, useRef } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useLanguage } from '../../features/language/useLanguage';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useTrapFocus } from '../../hooks/useTrapFocus';
import { KeyCode } from '../../types/enums';
import { SizeVariant } from '../../types/types';
import BtnClose from '../BtnClose';
import Overlay from '../overlay/Overlay';
import Portal from '../Portal';
import './_modal.scss';
import { selectModalId } from './ModalSlice';
import { useAnimate } from './useAnimate';
import { useModal } from './useModal';

export interface ModalProps {
  ariaControls: string;
  children: ReactNode;
  headerText: string;
  modalId: string;
  className?: string;
  isAlert?: boolean;
  modalSize?: SizeVariant;
  showCloseIcon?: boolean;
  onClearAllValues?: () => void;
}

const Modal = ({
  children,
  isAlert,
  modalId,
  headerText,
  showCloseIcon,
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

  const { shouldRender, transitionState, handleTransitionEnd } = useAnimate({
    isOpen: isModalOpen,
  });

  const { closeModal } = useModal();

  const handleClose = () => {
    onClearAllValues?.();
    closeModal();
  };

  useKeyPress(handleClose, [KeyCode.Esc], isModalOpen);
  useScrollLock(shouldRender);
  useClickOutside(modalRef, handleClose, [modalRef]);
  useTrapFocus({
    popupRef: modalRef,
    enabled: shouldRender,
  });

  if (!shouldRender) {
    return null;
  }

  return (
    <Portal portalId="modal">
      <dialog
        id={ariaControls}
        aria-labelledby={dialogId}
        ref={modalRef}
        className={`pop-modal transition from-top-center modal-${modalSize} ${className} ${transitionState}`}
        onTransitionEnd={handleTransitionEnd}
        role={isAlert ? 'alertdialog' : undefined}
      >
        <header className="modal-header">
          <h2 className="modal-title" id={dialogId}>
            {headerText}
          </h2>
          {showCloseIcon && (
            <BtnClose onClick={handleClose} ariaLabel={language.closeDialog} />
          )}
        </header>

        <div className="modal-content">{children}</div>
      </dialog>

      <Overlay />
    </Portal>
  );
};

export default Modal;
