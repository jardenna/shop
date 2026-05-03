import { ReactNode } from 'react';
import { translateKey } from '../../utils/utils';
import BtnClose from '../BtnClose';

type TagListItemProps = {
  children: ReactNode;
  language: Record<string, string>;
  value: string;
  onClick: () => void;
};

const TagListItem = ({
  language,
  onClick,
  value,
  children,
}: TagListItemProps) => (
  <li className="tag-item">
    {children}
    <BtnClose
      size="1em"
      onClick={onClick}
      ariaLabel={`${language.removeFilter} ${translateKey(value, language)}`}
    />
  </li>
);

export default TagListItem;
