import { useId, type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useAppSelector } from '../../app/hooks';
import { selectModalId } from '../../features/modalSlice';
import { useClickOutside } from '../../hooks/useClickOutside';
import { SizeVariant } from '../../types/types';
import ErrorBoundaryFallback from '../ErrorBoundaryFallback';
import Overlay from '../overlay/Overlay';
import Portal from '../Portal';
import './_dialog.scss';

import { useDialog } from './useDialog';
import { useVisibility } from './useVisibility';

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
  const { closeModalState, popupRef } = useDialog(modalId);
  const dialogId = useId();

  const { closeModalAnimated, popupClass } = useVisibility(
    modalId === id,
    closeModalState,
  );

  useClickOutside(popupRef, () => {
    closeModalAnimated();
  }, [popupRef]);

  if (modalId !== id || !modalId) {
    return null;
  }

  const handleErrorBoundaryReset = () => {
    closeModalAnimated();
  };

  return (
    <Portal portalId="modal">
      <dialog
        id={ariaControlsId}
        aria-labelledby={dialogId}
        ref={popupRef}
        className={`modal modal-${modalSize} ${className} ${popupClass} animate-top-center`}
        role={isAlert ? 'alertdialog' : undefined}
      >
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={handleErrorBoundaryReset}
        >
          {children}
        </ErrorBoundary>
      </dialog>
      <Overlay />
    </Portal>
  );
};

export default Dialog;
