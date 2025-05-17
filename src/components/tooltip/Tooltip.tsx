import { Placement } from '@popperjs/core';
import { ReactNode } from 'react';
import useDropdown from '../../hooks/useDropdown';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import './_tooltip.scss';

type TooltipProps = {
  ariaControls: string;
  ariaLabel: string;
  children: ReactNode;
  tooltip: string | ReactNode;
  placement?: Placement;
  triggerBtnClassName?: string;
  triggerBtnVariant?: BtnVariant;
};

const Tooltip = ({
  children,
  tooltip,
  ariaControls,
  ariaLabel,
  triggerBtnVariant,
  triggerBtnClassName = '',
  placement,
}: TooltipProps) => {
  const {
    dropdownRef,
    buttonRef,
    dropdownIsOpen,
    toggleDropdownList,
    arrowRef,
  } = useDropdown({ placement });

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
        tooltipRef={buttonRef}
      >
        {children}
      </Button>

      {dropdownIsOpen && (
        <div ref={dropdownRef} className="tooltip-content" id={ariaControls}>
          {tooltip}
          <div ref={arrowRef} className="arrow" />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
