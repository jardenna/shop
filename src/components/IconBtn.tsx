import { BtnType, BtnVariant, IconName } from '../types/enums';
import Button from './Button';
import IconContent from './IconContent';

export type IconBtnProps = {
  iconName: IconName;
  title: string;
  ariaExpanded?: boolean;
  ariaLabel?: string;
  ariaSelected?: boolean;
  btnType?: BtnType;
  className?: string;
  disabled?: boolean;
  size?: string;
  variant?: BtnVariant;
  onClick?: () => void;
};

const IconBtn = ({
  ariaLabel,
  iconName,
  title,
  onClick,
  className,
  ariaSelected,
  ariaExpanded,
  btnType,
  variant = BtnVariant.Ghost,
  size,
  disabled,
}: IconBtnProps) => (
  <Button
    variant={variant}
    onClick={onClick}
    className={className}
    ariaSelected={ariaSelected}
    ariaExpanded={ariaExpanded}
    type={btnType}
    disabled={disabled}
  >
    <IconContent
      iconName={iconName}
      title={title}
      ariaLabel={ariaLabel || ''}
      size={size}
    />
  </Button>
);

export default IconBtn;
