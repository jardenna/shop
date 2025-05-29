import { ReactNode } from 'react';
import usePopup from '../../hooks/usePopup';
import Button from '../Button';
import { DropdownBtnProps } from '../dropdownBtn/DropdownBtn';
import './_tooltip.scss';

type OmittedDropdownBtnProps = Omit<
  DropdownBtnProps,
  'dropdownList' | 'showArrow'
>;

type TooltipProps = OmittedDropdownBtnProps & {
  tooltip: ReactNode | ((helpers: { close: () => void }) => ReactNode);
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
  const { popupRef, buttonRef, popupIsOpen, togglePopupList, arrowRef } =
    usePopup({ placement });

  return (
    <div className="popup">
      <Button
        variant={triggerBtnVariant}
        onClick={togglePopupList}
        ariaExpanded={popupIsOpen}
        ariaHasPopup
        ariaControls={ariaControls}
        ariaLabel={ariaLabel}
        className={triggerBtnClassName}
        tooltipRef={buttonRef}
      >
        {children}
      </Button>

      {popupIsOpen && (
        <div
          role="tooltip"
          ref={popupRef}
          className="tooltip popup-container"
          id={ariaControls}
        >
          {typeof tooltip === 'function'
            ? tooltip({ close: togglePopupList })
            : tooltip}
          <span ref={arrowRef} className="popup-arrow" aria-hidden={true} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
