import type { DisplyReviews } from '../../../../app/api/apiTypes/shopApiTypes';
import Icon from '../../../../components/icons/Icon';
import variables from '../../../../scss/variables.module.scss';
import { IconName } from '../../../../types/enums';
import './_reviews.scss';

type ReviewsDisplayProps = {
  numOfReviews: number;
  rating: number;
  reviewList: DisplyReviews[];
};

const ReviewsDisplay = ({
  rating,
  reviewList,
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
    <div>
      <section className="review-display">
        Bedømt til 2 ud af 5 stjerner
        <div className="stars">
          {stars.map((type, index) => (
            <span key={index} className="star">
              {type === 'full' && (
                <Icon
                  iconName={IconName.Star}
                  title=""
                  fill={variables.colorYellow}
                />
              )}
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
      {reviewList.map((review, index) => (
        <div key={index}>
          {review.comment}
          <span>{review.rating}</span>
          <p>{review.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsDisplay;
