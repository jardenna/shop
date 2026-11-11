import { useId } from 'react';
import Icon from '../components/icons/Icon';
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
import { IconName } from '../types/enums';
import './adminReviewPage.styles.scss';

const AdminReviewPage = () => {
  const { language } = useLanguage();
  const ariaLabelledby = useId();
  const { onAddToast } = useToast();

  const { data: reviews } = useGetReviewsQuery({});
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

  const handleSort = (value: string) => {
    console.log(value);
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
