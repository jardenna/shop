import { IconName } from '../types/enums';
import Icon from './icons/Icon';
import VisuallyHidden from './VisuallyHidden';

type IconContentProps = {
  ariaLabel: string;
  iconName: IconName;
  title: string;
  size?: string;
};

const IconContent = ({
  iconName,
  title,
  ariaLabel,
  size,
}: IconContentProps) => (
  <>
    <Icon iconName={iconName} title={title} size={size} />
    {ariaLabel && <VisuallyHidden>{ariaLabel}</VisuallyHidden>}
  </>
);

export default IconContent;
