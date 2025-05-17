import { createPopper } from '@popperjs/core';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';

type DropdownProps = {
  ariaControls: string;
  ariaLabel: string;
  children: ReactNode;
  tooltip: string | ReactNode;
  dropdownIsOpen?: boolean;
  triggerBtnClassName?: string;
  triggerBtnVariant?: BtnVariant;
};

const Tooltip = ({
  children,
  tooltip,
  triggerBtnClassName,
  ariaControls,
  triggerBtnVariant,
  dropdownIsOpen,
  ariaLabel,
}: DropdownProps) => {
  const referenceRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!referenceRef.current || !tooltipRef.current) {
      return;
    }

    const popperInstance = createPopper(
      referenceRef.current,
      tooltipRef.current,
      {
        placement: 'top',
        modifiers: [
          {
            name: 'offset',
            options: { offset: [0, 8] },
          },
          {
            name: 'preventOverflow',
            options: { boundary: 'viewport' },
          },
        ],
      },
    );

    return () => {
      popperInstance.destroy();
    };
  }, [visible]);

  return (
    <>
      <div
        ref={referenceRef}
        onMouseEnter={() => {
          setVisible(true);
        }}
        onMouseLeave={() => {
          setVisible(false);
        }}
        className="tooltip-container"
      >
        <Button
          variant={triggerBtnVariant}
          ariaExpanded={dropdownIsOpen}
          ariaHasPopup
          ariaControls={ariaControls}
          ariaLabel={ariaLabel}
          className={triggerBtnClassName}
        >
          {children}
        </Button>
      </div>
      {visible && (
        <div ref={tooltipRef} className="tooltip-content">
          {tooltip}
        </div>
      )}
    </>
  );
};

export default Tooltip;
