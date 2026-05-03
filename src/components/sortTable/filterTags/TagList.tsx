import { translateKey } from '../../../utils/utils';
import TagListItem from '../../tags/TagListItem';
import { TagItem } from './buildFilterTags';

type TagListProps = {
  language: Record<string, string>;
  tagList: TagItem[];
  onClick: (key: string, value: string) => void;
};

const TagList = ({ tagList, language, onClick }: TagListProps) => (
  <ul className="tag-list" aria-live="polite">
    {tagList.map(({ value, key }) => (
      <TagListItem
        key={value}
        onClick={() => {
          onClick(key, value);
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
