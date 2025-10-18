import type { FilterKeys } from '../../pages/CollectionPage';
import { IconName } from '../../types/enums';
import { translateKey } from '../../utils/utils';
import IconBtn from '../IconBtn';
import './_tag-list.scss';

type TagListProps = {
  ariaLabel: string;
  filterKey: FilterKeys;
  language: Record<string, string>;
  values: string[];
  onClick: (key: FilterKeys, value: string) => void;
};
const TagList = ({
  values,
  onClick,
  filterKey,
  ariaLabel,
  language,
}: TagListProps) => (
  <ul className="tag-list" aria-relevant="removals" aria-live="assertive">
    {values.map((value) => (
      <li key={value} className="tag-item">
        <span>{value}</span>
        <IconBtn
          size="1em"
          onClick={() => {
            onClick(filterKey, value);
          }}
          iconName={IconName.Close}
          ariaLabel={`${ariaLabel} ${translateKey(value, language)}`}
        />
      </li>
    ))}
  </ul>
);

export default TagList;
