import { ReactNode } from 'react';
import { AriaHasPopup } from '../../types/types';
import Popup from '../popup/Popup';

interface PopoverBtnProps {
  ariaHasPopup: AriaHasPopup;
  children: ReactNode;
  popupContent: ReactNode | string;
  ariaLabel?: string;
  className?: string;
}

const PopoverBtn = ({
  popupContent,
  children,
  ariaHasPopup,
  ariaLabel,
  className = '',
}: PopoverBtnProps) => (
  <Popup
    ariaLabel={ariaLabel}
    popupContent={popupContent}
    ariaHasPopup={ariaHasPopup}
    className={className}
  >
    {children}
  </Popup>
);

export default PopoverBtn;
