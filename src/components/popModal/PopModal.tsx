import { ReactNode, useId, useRef } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useLanguage } from '../../features/language/useLanguage';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useScrollLock } from '../../hooks/useScrollLock';
import { KeyCode } from '../../types/enums';
import { SizeVariant } from '../../types/types';
import BtnClose from '../BtnClose';
import Overlay from '../overlay/Overlay';
import Portal from '../Portal';
import './_pop-modal.scss';
import { selectModalId } from './popModalSlice';
import { useAnimate } from './useAnimate';
import { usePopModal } from './usePopModal';
import { useTrapPopFocus } from './useTrapPopFocus';

interface PopModalProps {
  ariaControls: string;
  children: ReactNode;
  headerText: string;
  modalId: string;
  className?: string;
  isAlert?: boolean;
  modalSize?: SizeVariant;
  showCloseIcon?: boolean;
}

const PopModal = ({
  children,
  isAlert,
  modalId,
  headerText,
  showCloseIcon,
  modalSize = 'small',
  className = '',
  ariaControls,
}: PopModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const { language } = useLanguage();

  const currentModalId = useAppSelector(selectModalId);
  const isModalOpen = currentModalId === modalId;

  const { shouldRender, transitionState, handleTransitionEnd } = useAnimate({
    isOpen: isModalOpen,
  });

  const { closeModal } = usePopModal();

  useKeyPress(closeModal, [KeyCode.Esc]);
  useScrollLock(shouldRender);
  useClickOutside(modalRef, closeModal, [modalRef]);
  useTrapPopFocus({
    popupRef: modalRef,
    enabled: shouldRender,
  });

  if (!shouldRender) {
    return null;
  }

  return (
    <Portal portalId="newModal">
      <dialog
        id={ariaControls}
        aria-labelledby={dialogId}
        ref={modalRef}
        className={`pop-modal transition modal-${modalSize} ${className} ${transitionState}`}
        onTransitionEnd={handleTransitionEnd}
        role={isAlert ? 'alertdialog' : undefined}
      >
        <header className="modal-header">
          <h2 className="modal-title" id={dialogId}>
            {headerText}
          </h2>
          {showCloseIcon && (
            <BtnClose onClick={closeModal} ariaLabel={language.closeDialog} />
          )}
        </header>
        <div className=" modal-content">{children}</div>
      </dialog>

      <Overlay />
    </Portal>
  );
};
export default PopModal;
