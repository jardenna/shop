import Img from '../components/Img';
import { useLanguage } from '../features/language/useLanguage';
import { useGetReviewsQuery } from '../features/reviews/reviewsApiSlice';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const AdminReviewPage = () => {
  const { language } = useLanguage();

  const { data: reviews } = useGetReviewsQuery({});
  console.log(reviews);

  return (
    <AdminPageContainer heading={language.reviews} hideBreadCrumbs>
      {reviews &&
        reviews.map((review) => (
          <section key={review.id}>
            <div>
              <Img src={review.image} alt="" className="review-img" />
              <p>{review.productName}</p>
              <p>Total rating </p>
            </div>
            <div>{review.comment}</div>
          </section>
        ))}
      page
    </AdminPageContainer>
  );
};

export default AdminReviewPage;
