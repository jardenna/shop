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
  <div className="admin-review-list">
    {reviews.map((review) => (
      <section key={review.id} className="admin-review-cart">
        <div className="review-product">
          <Link to={`${ShopPath.AllProducts}/${review.productId}`}>
            <Img src={review.image} alt="" className="review-product-img" />
          </Link>
          <div>
            <p>{review.productName}</p>
            <p>Reviewed by {review.userName}</p>
            <p>Total rating</p>
          </div>
        </div>
        <div>
          <ReviewStars rating={review.rating} />
          {review.comment}
        </div>
      </section>
    ))}
  </div>
);

export default AdminReviewList;
