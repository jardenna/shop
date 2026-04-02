import { Placement } from '@popperjs/core';
import { ReactNode, useId } from 'react';
import { usePopup } from '../../hooks/usePopup';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import './_popup.scss';

interface PopupProps {
  children: ReactNode;
  popupContent: ReactNode | ((params: { close: () => void }) => ReactNode);
  ariaLabel?: string;
  placement?: Placement;
  popupType?: 'tooltip' | 'popover';
  triggerBtnClassName?: string;
  triggerBtnVariant?: BtnVariant;
  onOpenPopup?: () => void;
}

const Popup = ({
  children,
  popupContent,
  ariaLabel,
  triggerBtnVariant = BtnVariant.Ghost,
  triggerBtnClassName,
  placement,
  onOpenPopup,
  popupType = 'popover',
}: PopupProps) => {
  const popupId = useId();

  const { popupRef, buttonRef, popupIsOpen, togglePopupList, arrowRef } =
    usePopup({ placement });

  const buttonAriaProps =
    popupType === 'tooltip'
      ? {
          ariaDescribedBy: popupId,
        }
      : {
          ariaExpanded: popupIsOpen,
          ariaControls: popupId,
        };

  const handleOpenPopup = () => {
    onOpenPopup?.();
    togglePopupList();
  };

  return (
    <div className="popup">
      <Button
        variant={triggerBtnVariant}
        onClick={handleOpenPopup}
        ariaLabel={ariaLabel}
        className={triggerBtnClassName}
        popupRef={buttonRef}
        {...buttonAriaProps}
      >
        {children}
      </Button>

      {popupIsOpen && (
        <div
          ref={popupRef}
          className="popup popup-container"
          id={popupId}
          role={popupType === 'tooltip' ? 'tooltip' : undefined}
        >
          {typeof popupContent === 'function'
            ? popupContent({ close: togglePopupList })
            : popupContent}

          <span ref={arrowRef} className="popup-arrow" aria-hidden />
        </div>
      )}
    </div>
  );
};

export default Popup;
