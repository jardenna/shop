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
  withLabel?: boolean;
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
