import type { DisplyReviews } from '../../../../app/api/apiTypes/shopApiTypes';
import Icon from '../../../../components/icons/Icon';
import { IconName } from '../../../../types/enums';
import './_reviews.scss';
type ReviewsDisplayProps = {
  numOfReviews: number;
  rating: number;
  reviews: DisplyReviews[];
};

const ReviewsDisplay = ({
  rating,
  reviews,
  numOfReviews,
}: ReviewsDisplayProps) => {
  const stars = [0, 1, 2, 3, 4].map((i) => {
    if (i + 1 <= rating) {
      return 'full';
    }
    if (i < rating) {
      return 'half';
    }
    return 'empty';
  });

  return (
    <article>
      <section className="review-display">
        <div className="stars">
          {stars.map((type, index) => (
            <span key={index} className="star" aria-hidden="true">
              {type === 'full' && <Icon iconName={IconName.Star} title="" />}
              {type === 'half' && (
                <Icon iconName={IconName.HalfStar} title="" />
              )}
              {type === 'empty' && <Icon iconName={IconName.Star} title="" />}
            </span>
          ))}
        </div>

        <span>{rating}</span>
        <span>{numOfReviews}</span>
      </section>
      {reviews.map((review, index) => (
        <div key={index}>
          {review.comment}
          <span>{review.rating}</span>
          <p>{review.name}</p>
        </div>
      ))}
    </article>
  );
};

export default ReviewsDisplay;
