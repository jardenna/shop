import { useId } from 'react';
import Button from '../components/Button';
import { useToast } from '../components/toast/hooks/useToast';
import AdminReviewForm from '../features/adminReviews/components/AdminReviewForm';
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
import { BtnVariant } from '../types/enums';
import './adminReviewPage.styles.scss';

const AdminReviewPage = () => {
  const { language } = useLanguage();
  const ariaLabelledby = useId();
  const { onAddToast } = useToast();

  const initialFilters = {
    isRead: 'all',
    productName: '',
    rating: [],
    sortOrder: 'asc',
    sortField: 'createdAt',
  };

  const { filterParams, setFilterParams, onClearAllFilters } =
    useSearchParamsState(initialFilters);

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

        <AdminReviewForm
          filterParams={filterParams}
          setFilterParams={setFilterParams}
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
