import type { ReviewParams } from '../../../../app/api/apiTypes/adminReviewApiTypes';
import FieldSet from '../../../../components/fieldset/FieldSet';
import Search from '../../../../components/formElements/Search';
import { IconName } from '../../../../components/icons/iconConstants';
import SegmentedElement from '../../../../components/segmentedElement/SegmentedElement';
import type { InputChangeHandler } from '../../../../shared/types';
import { useLanguage } from '../../../language/useLanguage';
import ReviewRatingList from '../reviewRatingList/ReviewRatingList';
import './_admin-review-filter-bar.scss';

interface AdminReviewFilterBarProps {
  filterParams: ReviewParams;
  setFilterParams: InputChangeHandler;
  toggleFilterParam: InputChangeHandler;
}

const AdminReviewFilterBar = ({
  filterParams,
  setFilterParams,
  toggleFilterParam,
}: AdminReviewFilterBarProps) => {
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
    <form className="review-filter-bar">
      <Search
        onChange={setFilterParams}
        value={filterParams.productName}
        id="productName"
        name="productName"
        labelText={language.searchByProductName}
        ariaLabel={language.pageSearch}
      />

      <div className="flex">
        <FieldSet legendText={language.sortByDate}>
          <SegmentedElement
            name="sortOrder"
            radioButtonList={createdAtList}
            checked={filterParams.sortOrder}
            onChange={setFilterParams}
          />
        </FieldSet>
        <FieldSet legendText={language.filterByStatus}>
          <SegmentedElement
            name="isRead"
            radioButtonList={isReadList}
            checked={filterParams.isRead}
            onChange={setFilterParams}
          />
        </FieldSet>
      </div>
      <FieldSet legendText={language.filterByStarRating}>
        <ReviewRatingList
          onChange={toggleFilterParam}
          values={filterParams.rating}
          language={language}
        />
      </FieldSet>
    </form>
  );
};

export default AdminReviewFilterBar;
