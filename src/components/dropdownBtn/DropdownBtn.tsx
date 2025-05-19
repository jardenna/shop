import { ReactNode, useRef } from 'react';
import useDropdown from '../../hooks/useDropdown';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import './_dropdown-btn.scss';
import DropdownList from './DropdownList';

export type DropdownItem = {
  id: number;
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
  const { dropdownRef, dropdownIsOpen, toggleDropdownList } = useDropdown({});
  const triggerDropdownBtnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <Button
        variant={btnVariant}
        ref={(el) => {
          triggerDropdownBtnRef.current = el;
        }}
        onClick={toggleDropdownList}
        ariaExpanded={dropdownIsOpen}
        ariaHasPopup
        ariaControls={ariaControls}
      >
        {children}
      </Button>
      {dropdownIsOpen && (
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
