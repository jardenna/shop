import Img from '../components/Img';
import { useGetReviewsQuery } from '../features/adminReviews/reviewsApiSlice';
import { useLanguage } from '../features/language/useLanguage';
import ReviewStars from '../features/shop/components/reviews/ReviewStars';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const AdminReviewPage = () => {
  const { language } = useLanguage();

  const { data: reviews } = useGetReviewsQuery({});

  return (
    <AdminPageContainer heading={language.reviews} hideBreadCrumbs>
      {reviews &&
        reviews.map((review) => (
          <section key={review.id}>
            {review.id}
            <ReviewStars rating={review.rating} />
            <div>
              <Img src={review.image} alt="" className="review-img" />
              <p>{review.productName}</p>
              <p>Total rating </p>
            </div>
            <div>{review.comment}</div>
          </section>
        ))}
      pagexx
    </AdminPageContainer>
  );
};

export default AdminReviewPage;
