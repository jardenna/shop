import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import useLanguage from '../../../features/language/useLanguage';
import useClickOutside from '../../../hooks/useClickOutside';
import useKeyPress from '../../../hooks/useKeyPress';
import { BtnVariant, KeyCode } from '../../../types/enums';
import Button from '../../Button';

interface DropdownProps {
  ariaControls: string;
  children: ReactNode;
  primaryBtnLabel: string;
  text: string;
  btnVariant?: BtnVariant;
  className?: string;
  primaryBtnClassName?: string;
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
  primaryBtnClassName = '',
  className = '',
}) => {
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const { language } = useLanguage();

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
        className={className}
      >
        {children}
      </Button>
      {dropdownIsOpen && (
        <section className="delete-row" ref={dropdownRef}>
          <div className="dropdown-text">{text}</div>
          <footer className="delete-row-footer">
            <Button onClick={handleSecondaryBtnClick}>
              {secondaryBtnLabel || language.cancel}
            </Button>
            <Button className={primaryBtnClassName} onClick={onPrimaryClick}>
              {primaryBtnLabel}
            </Button>
          </footer>
        </section>
      )}
    </div>
  );
};

export default Dropdown;
