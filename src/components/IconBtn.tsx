import { BtnType, BtnVariant, IconName } from '../types/enums';
import Button from './Button';
import IconContent from './IconContent';

export type BaseIconBtn = {
  ariaLabel: string;
  iconName: IconName;
  title: string;
  className?: string;
  size?: string;
  withLabel?: boolean;
};

type IconBtnProps = BaseIconBtn & {
  ariaExpanded?: boolean;
  btnType?: BtnType;
  disabled?: boolean;
  variant?: BtnVariant;
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
