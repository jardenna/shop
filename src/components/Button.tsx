/* eslint-disable react/button-has-type */

import { ReactNode, RefObject } from 'react';
import { BtnVariant } from '../types/enums';
import { ButtonEventType, ButtonType } from '../types/types';
import Loader from './loader/Loader';
import VisuallyHidden from './VisuallyHidden';

type ButtonProps = {
  children: ReactNode;
  ariaControls?: string;
  ariaDescribedby?: string;
  ariaExpanded?: boolean;
  ariaHasPopup?: boolean;
  ariaLabel?: string;
  ariaSelected?: boolean;
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  isLoading?: boolean;
  name?: string;
  role?: string;
  tabIndex?: 0 | -1;
  tooltipRef?: RefObject<HTMLButtonElement | null>;
  type?: ButtonType;
  variant?: BtnVariant;
  onClick?: (event: ButtonEventType | string) => void;
  ref?: (el: HTMLButtonElement | null) => void;
};

const Button = ({
  children,
  type = 'button',
  id,
  tabIndex,
  variant = BtnVariant.Primary,
  onClick,
  ref,
  ariaSelected,
  ariaExpanded,
  ariaControls,
  ariaLabel,
  ariaHasPopup,
  role,
  className = '',
  autoFocus,
  disabled,
  name,
  ariaDescribedby,
  isLoading,
  tooltipRef,
}: ButtonProps) => (
  <button
    id={id}
    tabIndex={tabIndex}
    role={role}
    type={type}
    ref={ref || tooltipRef}
    onClick={onClick}
    aria-selected={ariaSelected}
    aria-expanded={ariaExpanded}
    aria-controls={ariaControls}
    aria-haspopup={ariaHasPopup}
    autoFocus={autoFocus}
    aria-disabled={disabled || isLoading}
    className={`btn btn-${variant} ${className}`}
    name={name}
    aria-describedby={ariaDescribedby || undefined}
  >
    {ariaLabel && <VisuallyHidden>{ariaLabel}</VisuallyHidden>}
    {!isLoading ? (
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
