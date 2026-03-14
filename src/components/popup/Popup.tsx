import { Placement } from '@popperjs/core';
import { ReactNode, useId } from 'react';
import { usePopup } from '../../hooks/usePopup';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import './_popup.scss';

interface PopupProps {
  ariaLabel: string;
  children: ReactNode;
  popupContent: ReactNode | ((helpers: { close: () => void }) => ReactNode);
  placement?: Placement;
  triggerBtnClassName?: string;
  triggerBtnVariant?: BtnVariant;
}

const Popup = ({
  children,
  popupContent,
  ariaLabel,
  triggerBtnVariant = BtnVariant.Ghost,
  triggerBtnClassName,
  placement,
}: PopupProps) => {
  const popupId = useId();
  const { popupRef, buttonRef, popupIsOpen, togglePopupList, arrowRef } =
    usePopup({ placement });

  return (
    <div className="popup">
      <Button
        variant={triggerBtnVariant}
        onClick={togglePopupList}
        ariaExpanded={popupIsOpen}
        ariaControls={popupId}
        ariaLabel={ariaLabel}
        className={triggerBtnClassName}
        popupRef={buttonRef}
      >
        {children}
      </Button>

      {popupIsOpen && (
        <div ref={popupRef} className="popup popup-container" id={popupId}>
          {typeof popupContent === 'function'
            ? popupContent({ close: togglePopupList })
            : popupContent}
          <span ref={arrowRef} className="popup-arrow" aria-hidden={true} />
        </div>
      )}
    </div>
  );
};

export default Popup;
