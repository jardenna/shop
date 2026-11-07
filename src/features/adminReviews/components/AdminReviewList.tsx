import { Link } from 'react-router';
import { AdminReviewsResponse } from '../../../app/api/apiTypes/adminReviewApiTypes';
import DateDisplay from '../../../components/datePicker/DateDisplay';
import Img from '../../../components/Img';
import ReviewStars from '../../../components/ReviewStars';
import { ShopPath } from '../../../layout/nav/enums';
import './_admin-review.scss';

interface AdminReviewListProps {
  reviews: AdminReviewsResponse[];
}

const AdminReviewList = ({ reviews }: AdminReviewListProps) => (
  <ul className="admin-review-list">
    {reviews.map((review) => (
      <li key={review.id} className="admin-review-cart">
        <article className="review-product">
          <Link to={`${ShopPath.AllProducts}/${review.productId}`}>
            <Img src={review.image} alt="" className="review-product-img" />
          </Link>
          <div className="review-product-info">
            <h2 className="review-product-name">{review.productName}</h2>
            <p>
              <span className="text-bold">Reviewed by:</span> {review.userName}
            </p>
            <p>
              <span className="text-bold">Total rating:</span> {review.rating}
            </p>
          </div>
        </article>
        <article>
          <div className="review-info">
            <ReviewStars rating={review.rating} />
            <DateDisplay date={review.createdAt} month="2-digit" />
          </div>
          <p className="review-comment">{review.comment}</p>
        </article>
      </li>
    ))}
  </ul>
);

export default AdminReviewList;
