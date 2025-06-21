import { IconBtnProps } from './IconBtn';
import Icon from './icons/Icon';
import VisuallyHidden from './VisuallyHidden';

const IconContent = ({ iconName, title, ariaLabel, size }: IconBtnProps) => (
  <>
    <Icon iconName={iconName} title={title} size={size} />
    {ariaLabel && <VisuallyHidden>{ariaLabel}</VisuallyHidden>}
  </>
);

export default IconContent;
