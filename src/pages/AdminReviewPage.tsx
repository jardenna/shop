import { useId } from 'react';
import Button from '../components/Button';
import Chip from '../components/chips/Chip';
import { chipVariants } from '../components/chips/chipsUtils';
import { useToast } from '../components/toast/hooks/useToast';
import AdminReviewList from '../features/adminReviews/components/reviewList/AdminReviewList';
import ReviewStats from '../features/adminReviews/components/reviewStats/ReviewStats';
import {
  useGetReviewsCountQuery,
  useGetReviewsQuery,
  useGetReviewStatsQuery,
  useMarkAllAsreadMutation,
  useMarkOneAsreadMutation,
} from '../features/adminReviews/reviewsApiSlice';
import { useLanguage } from '../features/language/useLanguage';
import LayoutElement from '../layout/LayoutElement';
import MetaTags from '../layout/MetaTags';
import { BtnVariant } from '../types/enums';

const AdminReviewPage = () => {
  const ariaLabelledby = useId();
  const { language } = useLanguage();
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
  const heading = language.page;
  return (
    <section
      className="admin-page page-medium admin-review-page"
      aria-labelledby={ariaLabelledby}
    >
      <MetaTags metaTitle={heading} />
      <LayoutElement className="page-header" ariaLabel={heading}>
        <h1 id={ariaLabelledby}>{language.reviews}</h1>
        {unreadCount && unreadCount.unreadCount > 0 && (
          <span aria-live="polite" aria-atomic="true">
            <Chip
              chipText={`${unreadCount.unreadCount} ${unreadCount.unreadCount > 1 ? language.unreadPlur : language.unread}`}
              variant={chipVariants.read}
            />
          </span>
        )}
        <Button
          onClick={handleReadAllReviews}
          showBtnLoader={isReadAllReviewLoading}
          disabled={unreadCount && unreadCount.unreadCount === 0}
          variant={BtnVariant.Secondary}
        >
          {language.markAllAsRead}
        </Button>
      </LayoutElement>
      <div className="page-cart">
        {reviewStats && <ReviewStats reviewStats={reviewStats} />}

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
