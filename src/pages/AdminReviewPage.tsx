import { useId } from 'react';
import Button from '../components/Button';
import FieldSet from '../components/fieldset/FieldSet';
import Icon from '../components/icons/Icon';
import SegmentedElement from '../components/segmentedElement/SegmentedElement';
import SegmentedTabs from '../components/segmentedTabs/SegmentedTabs';
import { useToast } from '../components/toast/hooks/useToast';
import AdminReviewHeader from '../features/adminReviews/components/AdminReviewHeader';
import AdminReviewList from '../features/adminReviews/components/adminReviewList/AdminReviewList';
import ReviewStats from '../features/adminReviews/components/reviewStats/ReviewStats';
import {
  useGetReviewsCountQuery,
  useGetReviewsQuery,
  useGetReviewStatsQuery,
  useMarkAllAsreadMutation,
  useMarkOneAsreadMutation,
} from '../features/adminReviews/reviewsApiSlice';
import { useLanguage } from '../features/language/useLanguage';
import { useSearchParamsState } from '../hooks/useSearchParamsState';
import { BtnVariant, IconName } from '../types/enums';
import './adminReviewPage.styles.scss';

const AdminReviewPage = () => {
  const { language } = useLanguage();
  const ariaLabelledby = useId();
  const { onAddToast } = useToast();

  // const params: ReviewParams = {
  //   sortField: 'createdAt',
  //   sortOrder: 'asc',
  //   isRead: 'all',
  //   productName: '',
  //   rating: ['1', '2'],
  // };

  const isReadTabList = [
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

  const handleSort = (value: string) => {
    console.log(value);
  };

  const initialFilters = {
    isRead: 'all',
    productName: '',
    rating: [],
  };

  const {
    filterParams,
    setFilterParams,
    // toggleFilterParam,
    onClearAllFilters,
  } = useSearchParamsState(initialFilters);

  const { data: reviews } = useGetReviewsQuery(filterParams);
  const { data: unreadCount } = useGetReviewsCountQuery();
  const { data: reviewStats } = useGetReviewStatsQuery();

  const [
    markAsRead,
    { isLoading: isReadReviewLoading, originalArgs: loadingReviewId },
  ] = useMarkOneAsreadMutation();

  const [markAllAsRead, { isLoading: isReadAllReviewLoading }] =
    useMarkAllAsreadMutation();

  const handleReadAllReviews = async () => {
    const result = await markAllAsRead().unwrap();

    if (result.success) {
      onAddToast({
        message: result.message,
      });
    }
  };

  const handleReadOneReview = async (reviewId: string) => {
    const result = await markAsRead(reviewId).unwrap();

    if (result.success) {
      onAddToast({
        message: result.message,
      });
    }
  };

  return (
    <section
      className="admin-page page-medium admin-review-page"
      aria-labelledby={ariaLabelledby}
    >
      {unreadCount && (
        <AdminReviewHeader
          ariaLabelledby={ariaLabelledby}
          unreadCount={unreadCount.unreadCount}
          onReadAllReviews={handleReadAllReviews}
          isReadAllReviewLoading={isReadAllReviewLoading}
        />
      )}

      <div className="page-cart">
        <Button
          className="clear-filter-btn"
          onClick={onClearAllFilters}
          variant={BtnVariant.Default}
        >
          <span>{language.clearFilters}</span>
        </Button>
        {reviewStats && <ReviewStats reviewStats={reviewStats} />}

        <SegmentedTabs
          onClick={handleSort}
          tabItemList={[
            {
              id: 1,
              value: 'asc',
              label: <Icon iconName={IconName.ClockUp} />,
              ariaLabel: language.sortAscending,
            },
            {
              id: 2,
              value: 'desc',
              label: <Icon iconName={IconName.ClockDown} />,
              ariaLabel: language.sortDescending,
            },
          ]}
        />
        <form>
          <FieldSet legendText="Filter by read status">
            <SegmentedElement
              name="isRead"
              radioButtonList={isReadTabList}
              checked={filterParams.isRead}
              onChange={setFilterParams}
              className="segmented-tab-list"
            />
          </FieldSet>
        </form>
        {reviews && (
          <AdminReviewList
            reviews={reviews}
            isReadReviewLoading={isReadReviewLoading}
            loadingReviewId={loadingReviewId}
            onReadOneReview={handleReadOneReview}
          />
        )}
      </div>
    </section>
  );
};

export default AdminReviewPage;
