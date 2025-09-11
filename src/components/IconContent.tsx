import { IconName } from '../types/enums';
import Icon from './icons/Icon';
import VisuallyHidden from './VisuallyHidden';

type IconContentProps = {
  ariaLabel: string;
  iconName: IconName;
  title: string;
  className?: string;
  fill?: string;
  size?: string;
};

const IconContent = ({
  iconName,
  title,
  ariaLabel,
  size,
  fill,
  className,
}: IconContentProps) => (
  <>
    <Icon
      iconName={iconName}
      title={title}
      size={size}
      fill={fill}
      className={className}
    />
    {ariaLabel && <VisuallyHidden>{ariaLabel}</VisuallyHidden>}
  </>
);

export default IconContent;
