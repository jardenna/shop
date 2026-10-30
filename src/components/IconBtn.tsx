import { BtnType, BtnVariant, IconName } from '../types/enums';
import { AriaHasPopup } from '../types/types';
import Button from './Button';
import IconContent from './IconContent';

export type BaseIconBtn = {
  ariaLabel: string;
  iconName: IconName;
  className?: string;
  showLabel?: boolean;
  size?: string;
};

type IconBtnProps = BaseIconBtn & {
  ariaExpanded?: boolean;
  ariaHasPopup?: AriaHasPopup;
  btnType?: BtnType;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: BtnVariant;
  onClick?: () => void;
};

const IconBtn = ({
  ariaLabel,
  iconName,
  onClick,
  className,
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
    className={className}
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
