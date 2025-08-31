import { DisplyReviews } from '../../../../app/api/apiTypes/shopApiTypes';
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
  const stars = Array.from({ length: 5 }, (_, index) => index < rating);

  return (
    <article>
      <section className="review-display ">
        {stars.map((isFilled, index) => (
          <span
            key={index}
            className={isFilled ? 'star filled' : 'star'}
            aria-hidden="true"
          >
            <Icon iconName={IconName.Star} title="" />
          </span>
        ))}
        <div>
          <Icon iconName={IconName.Star} title="" />
          <Icon iconName={IconName.HalfStar} title="" />
          <Icon
            iconName={IconName.HalfStar}
            title=""
            className="half-star-right"
          />
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
