import { Link } from 'react-router';
import { AdminReviewsResponse } from '../../../app/api/apiTypes/adminReviewApiTypes';
import Img from '../../../components/Img';
import ReviewStars from '../../../components/reviewStars/ReviewStars';
import { ShopPath } from '../../../layout/nav/enums';
import './_admin-review.scss';

interface AdminReviewListProps {
  reviews: AdminReviewsResponse[];
}

const AdminReviewList = ({ reviews }: AdminReviewListProps) => (
  <section>
    {reviews.map((review) => (
      <section key={review.id}>
        <ReviewStars rating={review.rating} />
        <div>
          <Link to={`${ShopPath.AllProducts}/${review.productId}`}>
            <Img src={review.image} alt="" className="review-product-img" />
          </Link>
          <p>{review.productName}</p>
          <p>Total rating </p>
        </div>
        <div>{review.comment}</div>
      </section>
    ))}
  </section>
);

export default AdminReviewList;
