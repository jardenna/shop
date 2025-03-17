import { FC } from 'react';
import { BtnVariant, IconName } from '../types/enums';
import Button from './Button';
import IconContent from './IconContent';

interface IconBtnProps {
  ariaLabel: string;
  iconName: IconName;
  title: string;
  ariaExpanded?: boolean;
  ariaSelected?: boolean;
  className?: string;
  onClick: () => void;
}

const IconBtn: FC<IconBtnProps> = ({
  ariaLabel,
  iconName,
  title,
  onClick,
  className = '',
  ariaSelected,
  ariaExpanded,
}) => (
  <Button
    variant={BtnVariant.Ghost}
    onClick={onClick}
    className={className}
    ariaSelected={ariaSelected}
    ariaExpanded={ariaExpanded}
  >
    <IconContent iconName={iconName} title={title} ariaLabel={ariaLabel} />
  </Button>
);

export default IconBtn;
