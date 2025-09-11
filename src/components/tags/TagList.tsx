import { FilterKeys } from '../../pages/CollectionPage';
import { IconName } from '../../types/enums';
import IconBtn from '../IconBtn';
import './_tag-list.scss';

type TagListProps = {
  filterKey: string;
  values: string[];
  onClick: (key: FilterKeys, value: string) => void;
};
const TagList = ({ values, onClick, filterKey }: TagListProps) => (
  <article className="tag-list">
    {values.map((value) => (
      <section key={value} className="tag-item">
        <div>{value}</div>
        <IconBtn
          onClick={() => {
            onClick(filterKey as FilterKeys, value);
          }}
          iconName={IconName.Close}
          title="ff"
          ariaLabel="s"
        />
      </section>
    ))}
  </article>
);

export default TagList;
