import type { FilterKeys } from '../../pages/CollectionPage';
import { translateKey } from '../../utils/utils';
import BtnClose from '../BtnClose';
import './_tag-list.scss';

type TagListProps = {
  filterKey: FilterKeys;
  language: Record<string, string>;
  values: string[];
  onClick: (key: FilterKeys, value: string) => void;
};
const TagList = ({ values, onClick, filterKey, language }: TagListProps) => (
  <ul className="tag-list" aria-live="polite">
    {values.map((value) => (
      <li key={value} className="tag-item">
        <span>{translateKey(value, language)}</span>
        <BtnClose
          size="1em"
          onClick={() => {
            onClick(filterKey, value);
          }}
          ariaLabel={`${language.removeFilter} ${translateKey(value, language)}`}
        />
      </li>
    ))}
  </ul>
);

export default TagList;
