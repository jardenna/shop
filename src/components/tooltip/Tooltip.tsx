import { FC, ReactNode } from 'react';
import useDropdown from '../../hooks/useDropdown';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import './_tooltip.scss';

interface DropdownProps {
  ariaControls: string;
  ariaLabel: string;
  children: ReactNode;
  text: string | ReactNode;
  triggerBtnClassName?: string;
  triggerBtnVariant?: BtnVariant;
}

const Tooltip: FC<DropdownProps> = ({
  text,
  ariaControls,
  ariaLabel,
  triggerBtnVariant,
  triggerBtnClassName = '',
  children,
}) => {
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
        <section className="tooltip-content" ref={dropdownRef}>
          <span>{text}</span>
        </section>
      )}
    </div>
  );
};

export default Tooltip;
