import { useToast } from '../components/toast/hooks/useToast';
import AdminReviewList from '../features/adminReviews/components/AdminReviewList';
import {
  useGetReviewsQuery,
  useMarkOneAsreadMutation,
} from '../features/adminReviews/reviewsApiSlice';
import { useLanguage } from '../features/language/useLanguage';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const AdminReviewPage = () => {
  const { language } = useLanguage();
  const { onAddToast } = useToast();

  const { data: reviews } = useGetReviewsQuery({});

  const [markAsRead, { isLoading: isReadReviewLoading }] =
    useMarkOneAsreadMutation();

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
      {reviews && (
        <AdminReviewList
          reviews={reviews}
          isReadReviewLoading={isReadReviewLoading}
          onReadOneReview={handleReadOneReview}
        />
      )}
    </AdminPageContainer>
  );
};

export default AdminReviewPage;
