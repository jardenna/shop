import Icon from '../../../../components/icons/Icon';
import VisuallyHidden from '../../../../components/VisuallyHidden';
import { IconName } from '../../../../types/enums';
import './_reviews.scss';

type ReviewsProps = {
  rating: number;
};

const Reviews = ({ rating }: ReviewsProps) => {
  const stars = Array.from(
    { length: 5 },
    (_, index) => index < Math.round(rating),
  );

  return (
    <div className="review">
      <VisuallyHidden>Rating: {rating} out of 5 stars</VisuallyHidden>
      <Icon iconName={IconName.Star} title="" />
      <Icon iconName={IconName.HalfStar} title="" />
      <Icon iconName={IconName.HalfStar} title="" className="half-star-right" />
      {stars.map((isFilled, index) => (
        <span
          key={index}
          className={isFilled ? 'star filled' : 'star'}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Reviews;
