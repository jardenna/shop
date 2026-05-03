import { translateKey } from '../../../utils/utils';
import BtnClose from '../../BtnClose';
import { TagItem } from './buildFilterTags';

type TagListProps = {
  language: Record<string, string>;
  tagList: TagItem[];
  onClick: (key: string, value: string) => void;
};

const TagList = ({ tagList, language, onClick }: TagListProps) => (
  <ul className="tag-list" aria-live="polite">
    {tagList.map((tag) => (
      <li key={tag.key} className="tag-item">
        <span>{translateKey(tag.label, language)}:</span>
        <span>{translateKey(tag.value, language)}</span>
        <BtnClose
          size="1em"
          onClick={() => {
            onClick(tag.key, tag.value);
          }}
          ariaLabel={`${language.removeFilter} ${translateKey(tag.value, language)}`}
        />
      </li>
    ))}
  </ul>
);

export default TagList;
