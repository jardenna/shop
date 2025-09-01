import { DisplyReviews } from '../../../../app/api/apiTypes/shopApiTypes';
import DateDisplay from '../../../../components/datePicker/DateDisplay';
import ReviewStars from './ReviewStars';
import { getStarsArray } from './reviewsUtil.';

type ReviewList = {
  reviewList: DisplyReviews[];
};

const ReviewList = ({ reviewList }: ReviewList) => (
  <section>
    {reviewList.map((review, index) => (
      <div key={index}>
        <ReviewStars
          stars={getStarsArray(review.rating)}
          rating={review.rating}
        />
        <h2>{review.name}</h2>
        {review.comment}
        <DateDisplay date={review.createdAt} />
      </div>
    ))}
  </section>
);
export default ReviewList;
