import { FilterKeys } from '../pages/CollectionPage';
import { IconName } from '../types/enums';
import IconBtn from './IconBtn';

type TagListProps = {
  filterKey: string;
  values: string[];
  onClick: (key: FilterKeys, value: string) => void;
};
const TagList = ({ values, onClick, filterKey }: TagListProps) => (
  <div>
    {values.map((value) => (
      <div key={value} className="tag-list">
        <p>{value}</p>

        <IconBtn
          onClick={() => {
            onClick(filterKey as FilterKeys, value);
          }}
          iconName={IconName.Close}
          title="ff"
          ariaLabel="s"
        />
      </div>
    ))}
  </div>
);

export default TagList;
