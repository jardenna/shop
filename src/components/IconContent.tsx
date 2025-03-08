import { FC } from 'react';
import Icon, { IconName } from './icons/Icon';
import VisuallyHidden from './VisuallyHidden';

interface IconContentProps {
  ariaLabel: string;
  iconName: IconName;
  title: string;
}

const IconContent: FC<IconContentProps> = ({ iconName, title, ariaLabel }) => (
  <>
    <Icon iconName={iconName} title={title} ariaHidden />
    <VisuallyHidden>{ariaLabel}</VisuallyHidden>
  </>
);

export default IconContent;
