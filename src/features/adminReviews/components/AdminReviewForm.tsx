import FieldSet from '../../../components/fieldset/FieldSet';
import CheckboxList from '../../../components/formElements/checkbox/CheckboxList';
import SegmentedElement from '../../../components/segmentedElement/SegmentedElement';
import { IconName } from '../../../types/enums';
import { InputChangeHandler } from '../../../types/types';
import { useLanguage } from '../../language/useLanguage';

interface FilterParamsProps {
  isRead: string;
  productName: string;
  rating: never[];
  sortField: string;
  sortOrder: string;
}

interface AdminReviewFormProps {
  filterParams: FilterParamsProps;
  setFilterParams: InputChangeHandler;
  toggleFilterParam: InputChangeHandler;
}

const AdminReviewForm = ({
  filterParams,
  setFilterParams,
  toggleFilterParam,
}: AdminReviewFormProps) => {
  const { language } = useLanguage();

  const createdAtList = [
    {
      id: 'asc',
      value: 'asc',
      label: language.sortAscending,
      iconName: IconName.ClockUp,
    },
    {
      id: 'desc',
      value: 'desc',
      iconName: IconName.ClockDown,
      label: language.sortDescending,
    },
  ];

  const isReadList = [
    {
      id: 'all',
      value: 'all',
      label: language.all,
    },
    {
      id: 'read',
      value: 'read',
      label: language.read,
    },
    {
      id: 'unread',
      value: 'unread',
      label: language.unread,
    },
  ];

  const ratingList = ['1', '2', '3', '4', '5'];

  return (
    <form>
      <FieldSet legendText={language.filterByStatus}>
        <SegmentedElement
          name="isRead"
          radioButtonList={isReadList}
          checked={filterParams.isRead}
          onChange={setFilterParams}
        />
      </FieldSet>
      <FieldSet legendText={language.sortByDate}>
        <SegmentedElement
          name="sortOrder"
          radioButtonList={createdAtList}
          checked={filterParams.sortOrder}
          onChange={setFilterParams}
        />
      </FieldSet>

      <CheckboxList
        checkBoxList={ratingList}
        name="rating"
        onChange={toggleFilterParam}
        values={filterParams.rating}
        language={language}
      />
    </form>
  );
};

export default AdminReviewForm;
