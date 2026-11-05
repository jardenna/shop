import { useLanguage } from '../features/language/useLanguage';
import { useGetReviewsQuery } from '../features/reviews/reviewsApiSlice';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const AdminReviewPage = () => {
  const { language } = useLanguage();

  const { data: reviews } = useGetReviewsQuery({});
  console.log(reviews);

  return (
    <AdminPageContainer heading={language.reviews} hideBreadCrumbs>
      page
    </AdminPageContainer>
  );
};

export default AdminReviewPage;
