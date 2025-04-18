import { BtnVariant, IconName } from '../types/enums';
import { BtnType } from '../types/types';
import Button from './Button';
import IconContent from './IconContent';

export type IconBtnProps = {
  ariaLabel: string;
  iconName: IconName;
  title: string;
  ariaExpanded?: boolean;
  ariaSelected?: boolean;
  btnType?: BtnType;
  className?: string;
  size?: string;
  onClick?: () => void;
};

const IconBtn = ({
  ariaLabel,
  iconName,
  title,
  onClick,
  className = '',
  ariaSelected,
  ariaExpanded,
  btnType,
  size,
}: IconBtnProps) => (
  <Button
    variant={BtnVariant.Ghost}
    onClick={onClick}
    className={className}
    ariaSelected={ariaSelected}
    ariaExpanded={ariaExpanded}
    type={btnType}
  >
    <IconContent
      iconName={iconName}
      title={title}
      ariaLabel={ariaLabel}
      size={size}
    />
  </Button>
);

export default IconBtn;
