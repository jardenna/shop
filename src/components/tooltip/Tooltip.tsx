import { ReactNode } from 'react';
import useDropdown from '../../hooks/useDropdown';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import './_tooltip.scss';

type DropdownProps = {
  ariaControls: string;
  ariaLabel: string;
  children: ReactNode;
  text: string | ReactNode;
  triggerBtnClassName?: string;
  triggerBtnVariant?: BtnVariant;
};

const Tooltip = ({
  text,
  ariaControls,
  ariaLabel,
  triggerBtnVariant,
  triggerBtnClassName = '',
  children,
}: DropdownProps) => {
  const { dropdownRef, dropdownIsOpen, toggleDropdownList } = useDropdown();

  return (
    <div className="tooltip-container">
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
        <span className="tooltip-content" ref={dropdownRef} id={ariaControls}>
          {text}
        </span>
      )}
    </div>
  );
};

export default Tooltip;
