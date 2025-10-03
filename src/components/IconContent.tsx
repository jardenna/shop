import type { BaseIconBtn } from './IconBtn';
import Icon from './icons/Icon';
import VisuallyHidden from './VisuallyHidden';

type IconContentProps = BaseIconBtn & {
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
  withLabel,
}: IconContentProps) => (
  <>
    <Icon
      iconName={iconName}
      title={title}
      size={size}
      fill={fill}
      className={className}
    />
    {withLabel ? ariaLabel : <VisuallyHidden>{ariaLabel}</VisuallyHidden>}
  </>
);

export default IconContent;
