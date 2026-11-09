import { useId } from 'react';
import Icon from '../components/icons/Icon';
import Tabs from '../components/tabs/Tabs';
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
import { IconName } from '../types/enums';
import './adminReviewPage.styles.scss';

const AdminReviewPage = () => {
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

        <div>
          <Icon iconName={IconName.ClockDown} />
          <Icon iconName={IconName.ClockUp} />
          <Tabs
            onClick={handleSort}
            tabItemList={[
              { id: 1, value: 'asc', label: 'asc' },
              { id: 2, value: 'desc', label: 'desc' },
            ]}
          />
        </div>

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
