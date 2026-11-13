import { useId } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ReviewParams } from '../app/api/apiTypes/adminReviewApiTypes';
import ClearFilterBtn from '../components/ClearFilterBtn';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import Skeleton from '../components/skeleton/Skeleton';
import { useToast } from '../components/toast/hooks/useToast';
import AdminReviewFilterBar from '../features/adminReviews/components/adminReviewFilterBar/AdminReviewFilterBar';
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
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useSearchParamsState } from '../hooks/useSearchParamsState';
import './adminReviewPage.styles.scss';

const AdminReviewPage = () => {
  const ariaLabelledby = useId();
  const { onAddToast } = useToast();

  const initialFilters: ReviewParams = {
    isRead: 'all',
    productName: '',
    rating: [],
    sortOrder: 'asc',
    sortField: 'createdAt',
  };

  const {
    filterParams,
    setFilterParams,
    onClearAllFilters,
    hasSearchParams,
    toggleFilterParam,
  } = useSearchParamsState(initialFilters, { pagination: false });

  const debouncedProductName = useDebouncedValue(filterParams.productName);

  const {
    data: reviews,
    isLoading,
    refetch,
  } = useGetReviewsQuery({
    ...filterParams,
    productName: debouncedProductName,
  });

  const { data: unreadCount } = useGetReviewsCountQuery();
  const { data: reviewStats, refetch: refetchReviewStats } =
    useGetReviewStatsQuery();

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

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={() => {
        refetch();
      }}
    >
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
          <ClearFilterBtn
            onClick={onClearAllFilters}
            disabled={!hasSearchParams}
          />

          {reviewStats && (
            <ReviewStats
              reviewStats={reviewStats}
              onReset={() => refetchReviewStats}
            />
          )}
          <AdminReviewFilterBar
            filterParams={filterParams}
            setFilterParams={setFilterParams}
            toggleFilterParam={toggleFilterParam}
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
    </ErrorBoundary>
  );
};

export default AdminReviewPage;
