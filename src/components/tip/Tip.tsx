import { createPopper } from '@popperjs/core';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { BtnVariant } from '../../types/enums';

type DropdownProps = {
  ariaControls: string;
  ariaLabel: string;
  children: ReactNode;
  tooltip: string | ReactNode;
  triggerBtnClassName?: string;
  triggerBtnVariant?: BtnVariant;
};

const Tooltip = ({ children, tooltip }: DropdownProps) => {
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
        className="inline-block"
      >
        {children}
      </div>
      {visible && (
        <div
          ref={tooltipRef}
          className="z-50 bg-black text-white text-sm px-2 py-1 rounded shadow-lg"
          style={{ position: 'absolute' }}
        >
          {tooltip}
        </div>
      )}
    </>
  );
};

export default Tooltip;
