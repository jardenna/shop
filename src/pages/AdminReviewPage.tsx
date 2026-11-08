import Button from '../components/Button';
import Cart from '../components/carts/Cart';
import Chip from '../components/chips/Chip';
import { chipVariants } from '../components/chips/chipsUtils';
import { useToast } from '../components/toast/hooks/useToast';
import AdminReviewList from '../features/adminReviews/components/reviewList/AdminReviewList';
import {
  useGetReviewsCountQuery,
  useGetReviewsQuery,
  useGetReviewStatsQuery,
  useMarkAllAsreadMutation,
  useMarkOneAsreadMutation,
} from '../features/adminReviews/reviewsApiSlice';
import { useLanguage } from '../features/language/useLanguage';
import { BtnVariant } from '../types/enums';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const AdminReviewPage = () => {
  const { language } = useLanguage();
  const { onAddToast } = useToast();

  const { data: reviews } = useGetReviewsQuery({});
  const { data: unreadCount } = useGetReviewsCountQuery();
  const { data: reviewStats } = useGetReviewStatsQuery();
  console.log(reviewStats);

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
    <AdminPageContainer
      heading={language.reviews}
      hideBreadCrumbs
      variant="medium"
      className="admin-review-page"
    >
      <section className="review-stats">
        <Cart>
          {language.averageRating}
          Du har {reviews?.length} anmeldelser i alt
        </Cart>
      </section>

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
      {reviews && (
        <AdminReviewList
          reviews={reviews}
          isReadReviewLoading={isReadReviewLoading}
          loadingReviewId={loadingReviewId}
          onReadOneReview={handleReadOneReview}
        />
      )}
    </AdminPageContainer>
  );
};

export default AdminReviewPage;
