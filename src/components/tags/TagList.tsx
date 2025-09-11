import { FilterKeys } from '../../pages/CollectionPage';
import { IconName } from '../../types/enums';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import IconBtn from '../IconBtn';
import './_tag-list.scss';

type TagListProps = {
  ariaLabel: string;
  filterKey: string;
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
          onClick={() => {
            onClick(filterKey as FilterKeys, value);
          }}
          iconName={IconName.Close}
          title=""
          ariaLabel={`${ariaLabel} ${getlowerCaseFirstLetter(value, language)}`}
        />
      </li>
    ))}
  </ul>
);

export default TagList;
