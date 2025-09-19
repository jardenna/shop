import { Placement } from '@popperjs/core';
import type { ReactNode } from 'react';
import usePopup from '../../hooks/usePopup';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import './_dropdown-btn.scss';
import DropdownList from './DropdownList';

export type DropdownItem = {
  label: string;
  btnVariant?: BtnVariant;
  disabled?: boolean;
  icon?: ReactNode;
  isActive?: boolean;
  onClick: () => void;
};

export type DropdownBtnProps = {
  ariaControls: string;
  children: ReactNode;
  dropdownList: DropdownItem[];
  ariaLabel?: string;
  placement?: Placement;
  showArrow?: boolean;
  triggerBtnClassName?: string;
  triggerBtnVariant?: BtnVariant;
};

const DropdownBtn = ({
  dropdownList,
  triggerBtnVariant = BtnVariant.Ghost,
  ariaControls,
  children,
  showArrow,
  placement,
  ariaLabel,
  triggerBtnClassName,
}: DropdownBtnProps) => {
  const { popupRef, popupIsOpen, togglePopupList, arrowRef, buttonRef } =
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
        ref={(el) => {
          buttonRef.current = el;
        }}
      >
        {children}
      </Button>
      {popupIsOpen && (
        <div ref={popupRef} className="popup-container" id={ariaControls}>
          <DropdownList defaultIndex={-1} dropdownList={dropdownList} />
          {showArrow && (
            <span ref={arrowRef} className="popup-arrow" aria-hidden={true} />
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownBtn;
