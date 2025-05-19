import { ReactNode } from 'react';
import usePopup from '../../hooks/usePopup';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import './_dropdown-btn.scss';
import DropdownList from './DropdownList';

export type DropdownItem = {
  label: string;
  btnVariant?: BtnVariant;
  className?: string;
  icon?: ReactNode;
  onClick: () => void;
};

type DropdownBtnProps = {
  ariaControls: string;
  children: ReactNode;
  dropdownList: DropdownItem[];
  btnVariant?: BtnVariant;
  showArrow?: boolean;
};

const DropdownBtn = ({
  dropdownList,
  btnVariant = BtnVariant.Ghost,
  ariaControls,
  children,
  showArrow,
}: DropdownBtnProps) => {
  const { popupRef, popupIsOpen, togglePopupList, arrowRef, buttonRef } =
    usePopup({});

  return (
    <div className="tooltip">
      <Button
        variant={btnVariant}
        ref={(el) => {
          buttonRef.current = el;
        }}
        onClick={togglePopupList}
        ariaExpanded={popupIsOpen}
        ariaHasPopup
        ariaControls={ariaControls}
      >
        {children}
      </Button>
      {popupIsOpen && (
        <div ref={popupRef} className="tooltip-container">
          <DropdownList
            defaultIndex={-1}
            dropdownList={dropdownList}
            ariaControls={ariaControls}
          />
          {showArrow && <div ref={arrowRef} className="arrow" />}
        </div>
      )}
    </div>
  );
};

export default DropdownBtn;
