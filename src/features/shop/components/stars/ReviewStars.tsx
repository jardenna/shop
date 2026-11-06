import Icon from '../../../../components/icons/Icon';
import variables from '../../../../scss/variables.module.scss';
import { IconName } from '../../../../types/enums';
import ReviewStarsInfo from '../reviews/ReviewStarsInfo';
import { getStarsArray } from '../reviews/reviewsUtil.';
import './_stars.scss';

interface ReviewStarsProps {
  rating: number;
  className?: string;
}

const ReviewStars = ({ rating, className = '' }: ReviewStarsProps) => {
  const stars = getStarsArray(rating);

  return (
    <div className="stars">
      <ul className={`star-list ${className}`} aria-hidden={true}>
        {stars.map((type, index) => (
          <li key={index}>
            {type === 'full' && (
              <Icon iconName={IconName.Star} fill={variables.colorYellow} />
            )}
            {type === 'half' && <Icon iconName={IconName.HalfStar} />}
            {type === 'empty' && <Icon iconName={IconName.Star} />}
          </li>
        ))}
      </ul>
      <ReviewStarsInfo rating={rating} />
    </div>
  );
};

export default ReviewStars;
