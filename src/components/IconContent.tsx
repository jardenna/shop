import { IconName } from '../types/enums';
import Icon from './icons/Icon';
import VisuallyHidden from './VisuallyHidden';

type IconContentProps = {
  ariaLabel: string;
  iconName: IconName;
  title: string;
  fill?: string;
  size?: string;
};

const IconContent = ({
  iconName,
  title,
  ariaLabel,
  size,
  fill,
}: IconContentProps) => (
  <>
    <Icon iconName={iconName} title={title} size={size} fill={fill} />
    {ariaLabel && <VisuallyHidden>{ariaLabel}</VisuallyHidden>}
  </>
);

export default IconContent;
