import { FC, ReactNode } from 'react';
import useLanguage from '../../features/language/useLanguage';
import useDropdown from '../../hooks/useDropdown';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import './_dropdown.scss';

interface DropdownProps {
  ariaControls: string;
  ariaLabel: string;
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
  ariaLabel,
  btnVariant,
  onPrimaryClick,
  children,
  primaryBtnLabel,
  secondaryBtnLabel,
  onSecondaryClick,
  primaryBtnClassName = '',
  className = '',
}) => {
  const { language } = useLanguage();
  const { dropdownRef, dropdownIsOpen, toggleDropdownList, handleCallback } =
    useDropdown({ callback: onSecondaryClick });

  return (
    <div className="dropdown-container">
      <Button
        variant={btnVariant}
        onClick={toggleDropdownList}
        ariaExpanded={dropdownIsOpen}
        ariaHasPopup
        ariaControls={ariaControls}
        className={className}
        ariaLabel={ariaLabel}
      >
        {children}
      </Button>
      {dropdownIsOpen && (
        <section className="dropdown-content" ref={dropdownRef}>
          <span>{text}</span>
          <footer className="dropdown-content-footer">
            <Button onClick={handleCallback}>
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
