import {
  BtnType,
  BtnVariant,
  type BtnVariantValue,
  type IconNameValue,
} from '../types/enums';
import { AriaHasPopup } from '../types/types';
import Button from './Button';
import IconContent from './IconContent';

export type BaseIconBtn = {
  iconName: IconNameValue;
  ariaLabel?: string;
  className?: string;
  showLabel?: boolean;
  size?: string;
};

interface IconBtnProps extends BaseIconBtn {
  ariaExpanded?: boolean;
  ariaHasPopup?: AriaHasPopup;
  btnType?: BtnType;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: BtnVariantValue;
  onClick?: () => void;
}

const IconBtn = ({
  ariaLabel,
  iconName,
  onClick,
  className = '',
  ariaExpanded,
  ariaHasPopup,
  btnType,
  variant = BtnVariant.Ghost,
  size,
  disabled,
  isLoading,
  showLabel,
}: IconBtnProps) => (
  <Button
    variant={variant}
    onClick={onClick}
    className={`${className} btn-icon`}
    ariaExpanded={ariaExpanded}
    type={btnType}
    disabled={disabled}
    showBtnLoader={isLoading}
    ariaHasPopup={ariaHasPopup}
  >
    <IconContent
      iconName={iconName}
      ariaLabel={ariaLabel}
      showLabel={showLabel}
      size={size}
    />
  </Button>
);

export default IconBtn;
