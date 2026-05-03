import { translateKey } from '../../../utils/utils';
import { TagItem } from './buildFilterTags';

type TagListProps = {
  language: Record<string, string>;
  tagList: TagItem[];
};

const TagList = ({ tagList, language }: TagListProps) => (
  <ul className="tag-list" aria-live="polite">
    {tagList.map((tag) => (
      <li key={tag.key} className="tag-item">
        <span>{translateKey(tag.label, language)}</span>
        <span>{translateKey(tag.value, language)}</span>
      </li>
    ))}
  </ul>
);

export default TagList;
