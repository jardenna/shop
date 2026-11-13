import { ReviewParams } from '../../../app/api/apiTypes/adminReviewApiTypes';
import FieldSet from '../../../components/fieldset/FieldSet';
import Search from '../../../components/formElements/Search';
import SegmentedElement from '../../../components/segmentedElement/SegmentedElement';
import { IconName } from '../../../types/enums';
import { InputChangeHandler } from '../../../types/types';
import { useLanguage } from '../../language/useLanguage';
import ReviewRatingList from './reviewRatingList/ReviewRatingList';

interface AdminReviewFormProps {
  filterParams: ReviewParams;
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

  return (
    <form>
      <Search
        onChange={setFilterParams}
        value={filterParams.productName}
        id="productName"
        name="productName"
        labelText={language.searchByProductName}
        ariaLabel="Page search"
      />

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
      <ReviewRatingList
        onChange={toggleFilterParam}
        values={filterParams.rating}
        language={language}
      />
    </form>
  );
};

export default AdminReviewForm;
