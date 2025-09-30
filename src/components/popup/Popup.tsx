import type { ReactNode } from 'react';
import usePopup from '../../hooks/usePopup';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import { DropdownBtnProps } from '../dropdownBtn/DropdownBtn';

type OmittedDropdownBtnProps = Omit<
  DropdownBtnProps,
  'dropdownList' | 'showArrow'
>;

type PopupProps = OmittedDropdownBtnProps & {
  popupContent: ReactNode | ((helpers: { close: () => void }) => ReactNode);
};

const Popup = ({
  children,
  popupContent,
  ariaControls,
  ariaLabel,
  triggerBtnVariant = BtnVariant.Ghost,
  triggerBtnClassName = '',
  placement,
}: PopupProps) => {
  const { popupRef, buttonRef, popupIsOpen, togglePopupList, arrowRef } =
    usePopup({ placement });

  return (
    <div className="popup">
      <Button
        variant={triggerBtnVariant}
        onClick={togglePopupList}
        ariaExpanded={popupIsOpen}
        ariaHasPopup
        ariaControls={ariaControls}
        ariaLabel={ariaLabel}
        className={triggerBtnClassName}
        popupRef={buttonRef}
      >
        {children}
      </Button>

      {popupIsOpen && (
        <div
          role="region"
          ref={popupRef}
          className="popup popup-container"
          id={ariaControls}
        >
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
