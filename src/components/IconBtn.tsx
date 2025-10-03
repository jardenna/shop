import { BtnType, BtnVariant, IconName } from '../types/enums';
import Button from './Button';
import IconContent from './IconContent';

export type IconBtnProps = {
  ariaLabel: string;
  iconName: IconName;
  title: string;
  ariaExpanded?: boolean;
  btnType?: BtnType;
  className?: string;
  disabled?: boolean;
  size?: string;
  variant?: BtnVariant;
  withLabel?: boolean;
  onClick?: () => void;
};

const IconBtn = ({
  ariaLabel,
  iconName,
  title,
  onClick,
  className,
  ariaExpanded,
  btnType,
  variant = BtnVariant.Ghost,
  size,
  disabled,
  withLabel,
}: IconBtnProps) => (
  <Button
    variant={variant}
    onClick={onClick}
    className={className}
    ariaExpanded={ariaExpanded}
    type={btnType}
    disabled={disabled}
  >
    <IconContent
      iconName={iconName}
      title={title}
      ariaLabel={ariaLabel}
      withLabel={withLabel}
      size={size}
    />
  </Button>
);

export default IconBtn;
