import { DisplyReviews } from '../../../../app/api/apiTypes/shopApiTypes';
import DateDisplay from '../../../../components/datePicker/DateDisplay';
import ReviewStars from './ReviewStars';

type ReviewList = {
  reviewList: DisplyReviews[];
};

type StarType = 'full' | 'half' | 'empty';

const ReviewList = ({ reviewList }: ReviewList) => {
  const getStarsArray = (rating: number): StarType[] => {
    const fullStars = Math.floor(rating);
    const decimal = rating - fullStars;
    const hasHalfStar = decimal >= 0.25 && decimal < 0.75;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return [
      ...Array<StarType>(fullStars).fill('full' as StarType),
      ...(hasHalfStar ? ['half' as StarType] : []),
      ...Array<StarType>(emptyStars).fill('empty' as StarType),
    ];
  };

  return (
    <div>
      {reviewList.map((review, index) => (
        <div key={index}>
          <ReviewStars
            stars={getStarsArray(review.rating)}
            rating={review.rating}
          />
          <h2>{review.name}</h2>
          <h3>{review.rating}</h3>
          {review.comment}
          <DateDisplay date={review.createdAt} />
        </div>
      ))}
    </div>
  );
};
export default ReviewList;
