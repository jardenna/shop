import type { DisplyReviews } from '../../../../app/api/apiTypes/shopApiTypes';
import IconContent from '../../../../components/IconContent';
import variables from '../../../../scss/variables.module.scss';
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
  const stars = [...Array(5).keys()].map((star) => {
    if (star + 1 <= rating) {
      return 'full';
    }
    if (star < rating) {
      return 'half';
    }
    return 'empty';
  });

  return (
    <article>
      <section className="review-display">
        <div className="stars">
          {stars.map((type, index) => (
            <span key={index} className="star">
              {type === 'full' && (
                <IconContent
                  iconName={IconName.Star}
                  title=""
                  ariaLabel="full"
                  fill={variables.colorYellow}
                />
              )}
              {type === 'half' && (
                <IconContent
                  iconName={IconName.HalfStar}
                  title=""
                  ariaLabel="half"
                />
              )}
              {type === 'empty' && (
                <IconContent
                  iconName={IconName.Star}
                  title=""
                  ariaLabel="empty"
                />
              )}
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
