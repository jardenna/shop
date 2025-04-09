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
  primaryBtnVariant?: BtnVariant;
  secondaryBtnLabel?: string;
  secondaryBtnVariant?: BtnVariant;
  triggerBtnClassName?: string;
  triggerBtnVariant?: BtnVariant;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
}

const Dropdown: FC<DropdownProps> = ({
  text,
  ariaControls,
  ariaLabel,
  triggerBtnVariant,
  triggerBtnClassName = '',
  onPrimaryClick,
  children,
  primaryBtnLabel,
  primaryBtnVariant = BtnVariant.Default,
  secondaryBtnLabel,
  secondaryBtnVariant,
  onSecondaryClick,
}) => {
  const { language } = useLanguage();
  const { dropdownRef, dropdownIsOpen, toggleDropdownList, handleCallback } =
    useDropdown({ callback: onSecondaryClick });

  return (
    <div className="dropdown-container">
      <Button
        variant={triggerBtnVariant}
        onClick={toggleDropdownList}
        ariaExpanded={dropdownIsOpen}
        ariaHasPopup
        ariaControls={ariaControls}
        ariaLabel={ariaLabel}
        className={triggerBtnClassName}
      >
        {children}
      </Button>
      {dropdownIsOpen && (
        <section
          className="dropdown-content"
          ref={dropdownRef}
          id={ariaControls}
        >
          <span>{text}</span>
          <footer className="dropdown-content-footer">
            <Button variant={secondaryBtnVariant} onClick={handleCallback}>
              {secondaryBtnLabel || language.cancel}
            </Button>
            <Button variant={primaryBtnVariant} onClick={onPrimaryClick}>
              {primaryBtnLabel}
            </Button>
          </footer>
        </section>
      )}
    </div>
  );
};

export default Dropdown;
