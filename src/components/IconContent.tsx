import { IconBtnProps } from './IconBtn';
import Icon from './icons/Icon';
import VisuallyHidden from './VisuallyHidden';

export type OmittedIconBtnProps = Omit<
  IconBtnProps,
  'ariaExpanded' | 'ariaSelected' | 'onClick' | 'btnType' | 'className'
>;

const IconContent = ({ iconName, title, ariaLabel, size }: IconBtnProps) => (
  <>
    <Icon iconName={iconName} title={title} ariaHidden size={size} />
    {ariaLabel && <VisuallyHidden>{ariaLabel}</VisuallyHidden>}
  </>
);

export default IconContent;
