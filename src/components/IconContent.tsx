import { FC } from 'react';
import { IconBtnProps } from './IconBtn';
import Icon from './icons/Icon';
import VisuallyHidden from './VisuallyHidden';

export type OmittedIconBtnProps = Omit<
  IconBtnProps,
  'ariaExpanded' | 'ariaSelected' | 'onClick' | 'btnType' | 'className'
>;

const IconContent: FC<IconBtnProps> = ({
  iconName,
  title,
  ariaLabel,
  size,
}) => (
  <>
    <Icon iconName={iconName} title={title} ariaHidden size={size} />
    <VisuallyHidden>{ariaLabel}</VisuallyHidden>
  </>
);

export default IconContent;
