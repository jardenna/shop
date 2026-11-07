import Button from '../components/Button';
import { useToast } from '../components/toast/hooks/useToast';
import AdminReviewList from '../features/adminReviews/components/AdminReviewList';
import {
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
      <Button
        onClick={handleReadAllReviews}
        showBtnLoader={isReadAllReviewLoading}
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
