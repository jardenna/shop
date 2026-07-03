/* eslint-disable react/button-has-type */

import { ButtonHTMLAttributes, type ReactNode, RefObject } from 'react';
import { BtnVariant } from '../types/enums';
import { AriaCurrentType, AriaHasPopup } from '../types/types';
import Loader from './loader/Loader';
import VisuallyHidden from './VisuallyHidden';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  ariaControls?: string;
  ariaCurrent?: AriaCurrentType;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  ariaHasPopup?: AriaHasPopup;
  ariaLabel?: string;
  ariaPressed?: boolean;
  popupRef?: RefObject<HTMLButtonElement | null>;
  showBtnLoader?: boolean;
  variant?: BtnVariant;
  ref?: (el: HTMLButtonElement | null) => void;
}

const Button = ({
  children,
  type,
  id,
  tabIndex,
  variant = BtnVariant.Primary,
  onClick,
  ref,
  ariaPressed,
  ariaDescribedBy,
  ariaExpanded,
  ariaControls,
  ariaCurrent,
  ariaLabel,
  ariaHasPopup,
  role,
  className = '',
  autoFocus,
  disabled,
  name,
  showBtnLoader,
  popupRef,
}: ButtonProps) => (
  <button
    id={id}
    tabIndex={tabIndex}
    role={role}
    type={type ?? 'button'}
    ref={ref || popupRef}
    onClick={onClick}
    aria-pressed={ariaPressed || undefined}
    aria-describedby={ariaDescribedBy}
    aria-expanded={ariaExpanded}
    aria-current={ariaCurrent || undefined}
    aria-controls={ariaControls}
    aria-haspopup={ariaHasPopup}
    autoFocus={autoFocus}
    disabled={disabled || showBtnLoader ? true : undefined}
    className={`btn btn-${variant} ${className}`}
    name={name}
  >
    {ariaLabel && <VisuallyHidden>{ariaLabel}</VisuallyHidden>}
    {!showBtnLoader ? (
      children
    ) : (
      <>
        <VisuallyHidden>Loading</VisuallyHidden>
        <span aria-hidden>
          <Loader />
        </span>
      </>
    )}
  </button>
);

export default Button;
