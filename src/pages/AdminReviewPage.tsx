import Button from '../components/Button';
import Chip from '../components/chips/Chip';
import { chipVariants } from '../components/chips/chipsUtils';
import { useToast } from '../components/toast/hooks/useToast';
import AdminReviewList from '../features/adminReviews/components/AdminReviewList';
import {
  useGetReviewsCountQuery,
  useGetReviewsQuery,
  useMarkAllAsreadMutation,
  useMarkOneAsreadMutation,
} from '../features/adminReviews/reviewsApiSlice';
import { useLanguage } from '../features/language/useLanguage';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const AdminReviewPage = () => {
  const { language } = useLanguage();
  const { onAddToast } = useToast();

  const { data: reviews } = useGetReviewsQuery({});
  const { data: unreadCount } = useGetReviewsCountQuery();

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
    >
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
