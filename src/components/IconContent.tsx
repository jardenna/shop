import type { BaseIconBtn } from './IconBtn';
import Icon from './icons/Icon';
import VisuallyHidden from './VisuallyHidden';

type IconContentProps = BaseIconBtn & {
  fill?: string;
  size?: string;
};

const IconContent = ({
  iconName,
  ariaLabel,
  size,
  fill,
  className,
  showLabel,
}: IconContentProps) => (
  <>
    <Icon iconName={iconName} size={size} fill={fill} className={className} />
    {showLabel ? ariaLabel : <VisuallyHidden>{ariaLabel}</VisuallyHidden>}
  </>
);

export default IconContent;
