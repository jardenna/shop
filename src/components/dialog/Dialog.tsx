import { ReactNode, RefObject, useId } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SizeVariant } from '../../types/types';
import ErrorBoundaryFallback from '../ErrorBoundaryFallback';
import Overlay from '../overlay/Overlay';
import Portal from '../Portal';

interface DialogProps {
  children: ReactNode;
  isMounted: boolean;
  popupClass: string;
  popupRef: RefObject<HTMLDialogElement | null>;
  ariaControlsId?: string;
  className?: string;
  isAlert?: boolean;
  modalSize?: SizeVariant;
  onAnimationEnd: () => void;
  onErrorBoundaryReset: () => void;
}

const Dialog = ({
  ariaControlsId,
  children,
  className = '',
  isAlert,
  isMounted,
  modalSize = 'small',
  onAnimationEnd,
  onErrorBoundaryReset,
  popupClass,
  popupRef,
}: DialogProps) => {
  const dialogId = useId();

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
        onAnimationEnd={onAnimationEnd}
      >
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={onErrorBoundaryReset}
        >
          {children}
        </ErrorBoundary>
      </dialog>

      <Overlay />
    </Portal>
  );
};

export default Dialog;
