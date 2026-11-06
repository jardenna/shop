import AdminReviewList from '../features/adminReviews/components/AdminReviewList';
import { useGetReviewsQuery } from '../features/adminReviews/reviewsApiSlice';
import { useLanguage } from '../features/language/useLanguage';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const AdminReviewPage = () => {
  const { language } = useLanguage();

  const { data: reviews } = useGetReviewsQuery({});

  return (
    <AdminPageContainer heading={language.reviews} hideBreadCrumbs>
      {reviews && <AdminReviewList reviews={reviews} />}
      pagexx
    </AdminPageContainer>
  );
};

export default AdminReviewPage;
