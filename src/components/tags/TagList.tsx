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
    {tagList.map(({ key, value, label }) => {
      const labelText = label
        ? `${translateKey(label, language)} ${translateKey(value, language)}`
        : translateKey(value, language);

      const ariaLabel = `${language.removeFilter} ${labelText}`;

      return (
        <TagListItem
          ariaLabel={ariaLabel}
          key={`${key}-${value}`}
          onClick={() => {
            onClick(key, value);
          }}
        >
          {label && <span>{translateKey(label, language)}:</span>}
          <span>{translateKey(value, language)}</span>
        </TagListItem>
      );
    })}
  </ul>
);

export default TagList;
