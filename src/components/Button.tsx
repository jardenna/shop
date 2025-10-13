/* eslint-disable react/button-has-type */

import { type ReactNode, RefObject } from 'react';
import { BtnType, BtnVariant } from '../types/enums';
import type {
  AriaCurrentType,
  AriaHasPopup,
  ButtonEventType,
} from '../types/types';
import Loader from './loader/Loader';
import VisuallyHidden from './VisuallyHidden';

type ButtonProps = {
  children: ReactNode;
  ariaControls?: string;
  ariaCurrent?: AriaCurrentType;
  ariaDescribedby?: string;
  ariaExpanded?: boolean;
  ariaHasPopup?: AriaHasPopup;
  ariaLabel?: string;
  ariaPressed?: boolean;
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  popupRef?: RefObject<HTMLButtonElement | null>;
  role?: string;
  showBtnLoader?: boolean;
  tabIndex?: 0 | -1;
  type?: BtnType;
  variant?: BtnVariant;
  onClick?: (event: ButtonEventType | string) => void;
  ref?: (el: HTMLButtonElement | null) => void;
};

const Button = ({
  children,
  type = BtnType.Button,
  id,
  tabIndex,
  variant = BtnVariant.Primary,
  onClick,
  ref,
  ariaPressed,
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
  ariaDescribedby,
  showBtnLoader,
  popupRef,
}: ButtonProps) => (
  <button
    id={id}
    tabIndex={tabIndex}
    role={role}
    type={type}
    ref={ref || popupRef}
    onClick={onClick}
    aria-pressed={ariaPressed || undefined}
    aria-expanded={ariaExpanded || undefined}
    aria-current={ariaCurrent || undefined}
    aria-controls={ariaControls}
    aria-haspopup={ariaHasPopup}
    autoFocus={autoFocus}
    disabled={disabled || showBtnLoader ? true : undefined}
    className={`btn btn-${variant} ${className}`}
    name={name}
    aria-describedby={ariaDescribedby || undefined}
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
