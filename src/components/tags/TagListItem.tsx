import { ReactNode } from 'react';
import BtnClose from '../BtnClose';

type TagListItemProps = {
  ariaLabel: string;
  children: ReactNode;
  onClick: () => void;
};

const TagListItem = ({ onClick, children, ariaLabel }: TagListItemProps) => (
  <li className="tag-item">
    {children}
    <BtnClose size="1em" onClick={onClick} ariaLabel={ariaLabel} />
  </li>
);

export default TagListItem;
