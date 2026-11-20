import type { ReactNode } from 'react';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import IconContent from '../IconContent';

type TagListItemProps = {
  ariaLabel: string;
  children: ReactNode;
  onClick: () => void;
};

const TagListItem = ({ onClick, children, ariaLabel }: TagListItemProps) => (
  <li className="tag-item">
    <Button variant={BtnVariant.Ghost} onClick={onClick}>
      {children}
      <IconContent iconName="close" ariaLabel={ariaLabel} size="1em" />
    </Button>
  </li>
);

export default TagListItem;
