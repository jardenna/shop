import { useId } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { ReviewParams } from '../app/api/apiTypes/adminReviewApiTypes';
import ClearFilterBtn from '../components/ClearFilterBtn';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import FilterPanel from '../components/filterPanel/FilterPanel';
import { useTogglePanel } from '../components/panel/useTogglePanel';
import SkeletonAdminReviewPage from '../components/skeleton/skeletonAdminReviewPage/SkeletonAdminReviewPage';
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
import { useLanguage } from '../features/language/useLanguage';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useSearchParamsState } from '../hooks/useSearchParamsState';
import { BtnVariant } from '../types/enums';
import { getFilterSummary } from '../utils/utils';
import './adminReviewPage.styles.scss';

const AdminReviewPage = () => {
  const ariaLabelledbyId = useId();
  const { language } = useLanguage();
  const { onAddToast } = useToast();
  const { isPanelShown, onTogglePanel, onHidePanel } = useTogglePanel();

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

  const filtersCount = getFilterSummary({
    isRead: filterParams.isRead === 'all' ? '' : filterParams.isRead,
    productName: filterParams.productName,
    rating: filterParams.rating,
  });

  const totalFiltersCount = filtersCount.totalCount;

  const debouncedProductName = useDebouncedValue(filterParams.productName);

  const {
    data: reviews,
    isLoading,
    refetch,
  } = useGetReviewsQuery({
    ...filterParams,
    productName: debouncedProductName,
  });

  const { data: unreadCount, isLoading: isUnreadCountLoading } =
    useGetReviewsCountQuery();
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

  if (isLoading || isUnreadCountLoading) {
    return <SkeletonAdminReviewPage />;
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
        aria-labelledby={ariaLabelledbyId}
      >
        bread crumb
        {unreadCount && (
          <AdminReviewHeader
            ariaLabelledby={ariaLabelledbyId}
            unreadCount={unreadCount.unreadCount}
            onReadAllReviews={handleReadAllReviews}
            isReadAllReviewLoading={isReadAllReviewLoading}
          />
        )}
        <div className="page-cart">
          {reviewStats && (
            <ReviewStats
              reviewStats={reviewStats}
              onReset={() => refetchReviewStats}
            />
          )}

          <div className="admin-review-toolbar">
            <ClearFilterBtn
              showIcon
              variant={BtnVariant.Ghost}
              onClick={onClearAllFilters}
              disabled={!hasSearchParams}
            />
            <FilterPanel
              onHidePanel={onHidePanel}
              isPanelShown={isPanelShown}
              onTogglePanel={onTogglePanel}
              portalId="filter-reviews"
              language={language}
              onReset={() => refetch()}
              totalFiltersCount={totalFiltersCount}
              panelHeading={language.filterProducts}
              ariaLabel={language.filterReviews}
            >
              <AdminReviewFilterBar
                filterParams={filterParams}
                setFilterParams={setFilterParams}
                toggleFilterParam={toggleFilterParam}
              />
            </FilterPanel>
          </div>
          {reviews && (
            <AdminReviewList
              reviews={reviews}
              isReadReviewLoading={isReadReviewLoading}
              loadingReviewId={loadingReviewId}
              onReadOneReview={handleReadOneReview}
              onClearAllFilters={onClearAllFilters}
            />
          )}
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default AdminReviewPage;
