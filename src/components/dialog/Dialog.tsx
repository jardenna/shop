import { useId, type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useAppSelector } from '../../app/hooks';
import { selectModalId } from '../../features/modalSlice';
import { useClickOutside } from '../../hooks/useClickOutside';
import { SizeVariant } from '../../types/types';
import Button from '../Button';
import ErrorBoundaryFallback from '../ErrorBoundaryFallback';
import Overlay from '../overlay/Overlay';
import Portal from '../Portal';
import './_dialog.scss';
import { useDialog } from './useDialog';

interface DialogProps {
  children: ReactNode;
  id: string;
  ariaControlsId?: string;
  className?: string;
  isAlert?: boolean;
  modalSize?: SizeVariant;
}

const Dialog = ({
  id,
  ariaControlsId,
  children,
  modalSize = 'small',
  className = '',
  isAlert,
}: DialogProps) => {
  const modalId = useAppSelector(selectModalId);
  const dialogId = useId();

  const { closeModal, handleAnimationEnd, isMounted, popupClass, popupRef } =
    useDialog(modalId === id ? modalId : null);

  useClickOutside(popupRef, closeModal, [popupRef]);

  if (!isMounted) {
    return null;
  }

  return (
    <Portal portalId="modal">
      <dialog
        id={ariaControlsId}
        aria-labelledby={dialogId}
        ref={popupRef}
        className={`modal modal-${modalSize} ${className} ${popupClass} animate-top-center`}
        role={isAlert ? 'alertdialog' : undefined}
        onAnimationEnd={handleAnimationEnd}
      >
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={closeModal}
        >
          {children}
          <Button onClick={closeModal}>close</Button>
        </ErrorBoundary>
      </dialog>
      <Overlay />
    </Portal>
  );
};

export default Dialog;
