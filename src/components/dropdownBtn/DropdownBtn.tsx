import { FC, ReactNode, useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import useKeyPress from '../../hooks/useKeyPress';
import { BtnVariant, KeyCode } from '../../types/enums';
import Button from '../Button';
import './_dropdown-btn.scss';
import DropdownList from './DropdownList';

export interface DropdownItem {
  id: number;
  label: string;
  className?: string;
  icon?: ReactNode;
  onClick: () => void;
}

interface DropdownBtnProps {
  ariaControls: string;
  children: ReactNode;
  dropdownList: DropdownItem[];
  username: string;
  btnVariant?: BtnVariant;
}

const DropdownBtn: FC<DropdownBtnProps> = ({
  dropdownList,
  btnVariant = BtnVariant.Ghost,
  ariaControls,
  children,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  useKeyPress(() => {
    setDropdownIsOpen(false);
  }, [KeyCode.Esc]);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const toggleDropdownList = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  useClickOutside(dropdownRef, () => {
    setDropdownIsOpen(false);
  }, [buttonRef]);

  return (
    <div className="dropdown-container">
      <Button
        variant={btnVariant}
        ref={(el) => {
          buttonRef.current = el;
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
          dropdownList={dropdownList}
          ref={dropdownRef}
          ariaControls={ariaControls}
        />
      )}
    </div>
  );
};

export default DropdownBtn;
