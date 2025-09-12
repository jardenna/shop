import { FilterKeys } from '../../pages/CollectionPage';
import { BtnVariant, IconName } from '../../types/enums';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import Button from '../Button';
import IconBtn from '../IconBtn';
import './_tag-list.scss';

type TagListProps = {
  ariaLabel: string;
  countsByKey: Record<string, number>;
  filterKey: FilterKeys;
  language: Record<string, string>;
  values: string[];
  onClearSingleFilter: (filterKey: FilterKeys) => void;
  onClick: (key: FilterKeys, value: string) => void;
};
const TagList = ({
  values,
  onClick,
  filterKey,
  ariaLabel,
  language,
  countsByKey,
  onClearSingleFilter,
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
          title=""
          ariaLabel={`${ariaLabel} ${getlowerCaseFirstLetter(value, language)}`}
        />
      </li>
    ))}
    <li>
      {countsByKey[filterKey]}
      <Button
        variant={BtnVariant.Default}
        onClick={() => {
          onClearSingleFilter(filterKey);
        }}
      >
        Ryd {filterKey}
      </Button>
    </li>
  </ul>
);

export default TagList;
