import { Placement } from '@popperjs/core';
import { useId, type ReactNode } from 'react';
import usePopup from '../../hooks/usePopup';
import { BtnVariant } from '../../types/enums';
import { AriaHasPopup } from '../../types/types';
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
  ariaHasPopup: AriaHasPopup;
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
  children,
  showArrow,
  placement,
  ariaLabel,
  ariaHasPopup,
  triggerBtnClassName,
}: DropdownBtnProps) => {
  const dropdownId = useId();
  const { popupRef, popupIsOpen, togglePopupList, arrowRef, buttonRef } =
    usePopup({ placement });

  return (
    <div>
      <Button
        variant={triggerBtnVariant}
        onClick={togglePopupList}
        ariaExpanded={popupIsOpen || false}
        ariaHasPopup={ariaHasPopup}
        ariaControls={dropdownId}
        ariaLabel={ariaLabel}
        className={triggerBtnClassName}
        ref={(el) => {
          buttonRef.current = el;
        }}
      >
        {children}
      </Button>
      {popupIsOpen && (
        <div ref={popupRef} className="popup-container" id={dropdownId}>
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
