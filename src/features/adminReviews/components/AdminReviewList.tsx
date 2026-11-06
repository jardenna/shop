import { AdminReviewsResponse } from '../../../app/api/apiTypes/adminReviewApiTypes';
import Img from '../../../components/Img';

interface AdminReviewListProps {
  reviews: AdminReviewsResponse[];
}

const AdminReviewList = ({ reviews }: AdminReviewListProps) => (
  <section>
    {reviews.map((review) => (
      <section key={review.id}>
        <div>
          <Img src={review.image} alt="" className="review-img" />
          <p>{review.productName}</p>
          <p>Total rating </p>
        </div>
        <div>{review.comment}</div>
      </section>
    ))}
  </section>
);

export default AdminReviewList;
