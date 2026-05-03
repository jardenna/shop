import { translateKey } from '../../utils/utils';
import './_tag-list.scss';
import TagListItem from './TagListItem';

export interface TagItem {
  key: string;
  value: string;
  label?: string;
}

interface TagListProps {
  language: Record<string, string>;
  tagList: TagItem[];
  onClick: (key: string, value: string) => void;
}

export const TagList = ({ tagList, language, onClick }: TagListProps) => (
  <ul className="tag-list" aria-live="polite">
    {tagList.map(({ key, value, label }) => (
      <TagListItem
        key={`${key}-${value}`}
        onClick={() => {
          onClick(key, value);
        }}
        value={value}
        language={language}
      >
        {label && <span>{translateKey(label, language)}:</span>}
        <span>{translateKey(value, language)}</span>
      </TagListItem>
    ))}
  </ul>
);

export default TagList;
