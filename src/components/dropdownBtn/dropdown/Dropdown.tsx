import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import useClickOutside from '../../../hooks/useClickOutside';
import useKeyPress from '../../../hooks/useKeyPress';
import { BtnVariant, KeyCode } from '../../../types/enums';
import Button from '../../Button';

export interface BtnDropdownProps {
  label: string;
  onClick: any;
}

interface DropdownProps {
  ariaControls: string;
  children: ReactNode;
  primaryBtnLabel: string;
  text: string;
  btnVariant?: BtnVariant;
  className?: string;
  secondaryBtnLabel?: string;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
}

const Dropdown: FC<DropdownProps> = ({
  text,
  ariaControls,
  btnVariant,
  onPrimaryClick,
  children,
  primaryBtnLabel,
  secondaryBtnLabel,
  onSecondaryClick,
  className = '',
}) => {
  const location = useLocation();
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

  useEffect(() => {
    setDropdownIsOpen(false);
  }, [location]);

  const handleSecondaryBtnClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    }
    setDropdownIsOpen(false);
  };

  return (
    <div className="test">
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
        <section className={`dropdown ${className}`} ref={dropdownRef}>
          <div className="dropdown-text">{text}</div>
          <footer className="dropdown-footer">
            <Button onClick={onPrimaryClick}>{primaryBtnLabel}</Button>
            <Button onClick={handleSecondaryBtnClick}>
              {secondaryBtnLabel || 'annuler'}
            </Button>
          </footer>
        </section>
      )}
    </div>
  );
};

export default Dropdown;
