import type { FilterKeys } from '../../pages/CollectionPage';
import { translateKey } from '../../utils/utils';
import './_tag-list.scss';
import TagListItem from './TagListItem';

type TagListProps = {
  filterKey: FilterKeys;
  language: Record<string, string>;
  values: string[];
  onClick: (key: FilterKeys, value: string) => void;
};
const TagList = ({ values, onClick, filterKey, language }: TagListProps) => (
  <ul className="tag-list" aria-live="polite">
    {values.map((value) => (
      <TagListItem
        key={value}
        onClick={() => {
          onClick(filterKey, value);
        }}
        value={value}
        language={language}
      >
        <span>{translateKey(value, language)}</span>
      </TagListItem>
    ))}
  </ul>
);

export default TagList;
