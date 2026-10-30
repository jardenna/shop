import { Placement } from '@popperjs/core';
import { ReactNode, useId } from 'react';
import { usePopup } from '../../hooks/usePopup';
import { IconName } from '../../types/enums';
import { AriaHasPopup } from '../../types/types';
import IconBtn from '../IconBtn';

interface PopoverBtnProps {
  ariaHasPopup: AriaHasPopup;
  ariaLabel: string;
  children: ReactNode;
  iconName: IconName;
  placement?: Placement;
}

const PopoverBtn = ({
  children,
  iconName,
  placement,
  ariaLabel,
  ariaHasPopup,
}: PopoverBtnProps) => {
  const dropdownId = useId();
  const { popupRef, popupIsOpen, togglePopupList } = usePopup({
    placement,
  });

  return (
    <div>
      <IconBtn
        onClick={togglePopupList}
        ariaLabel={ariaLabel}
        iconName={iconName}
        ariaExpanded={popupIsOpen || false}
        ariaHasPopup={ariaHasPopup}
      />
      {/* <Button
        variant={BtnVariant.Ghost}
        onClick={togglePopupList}
        ariaExpanded={popupIsOpen || false}
        ariaHasPopup={ariaHasPopup}
        ariaControls={dropdownId}
        ariaLabel={ariaLabel}
        refCallback={(element) => {
          buttonRef.current = element;
        }}
      >
        <Icon iconName={iconName} size="1em" />
      </Button> */}
      {popupIsOpen && (
        <div ref={popupRef} className="popup-container" id={dropdownId}>
          {children}
        </div>
      )}
    </div>
  );
};

export default PopoverBtn;
