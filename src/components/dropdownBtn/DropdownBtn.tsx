import { ReactNode, useRef } from 'react';
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
};

const DropdownBtn = ({
  dropdownList,
  btnVariant = BtnVariant.Ghost,
  ariaControls,
  children,
}: DropdownBtnProps) => {
  const { popupRef, popupIsOpen, togglePopupList } = usePopup({});
  const triggerDropdownBtnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="dropdown-container" ref={popupRef}>
      <Button
        variant={btnVariant}
        ref={(el) => {
          triggerDropdownBtnRef.current = el;
        }}
        onClick={togglePopupList}
        ariaExpanded={popupIsOpen}
        ariaHasPopup
        ariaControls={ariaControls}
      >
        {children}
      </Button>
      {popupIsOpen && (
        <DropdownList
          defaultIndex={-1}
          dropdownList={dropdownList}
          ariaControls={ariaControls}
        />
      )}
    </div>
  );
};

export default DropdownBtn;
