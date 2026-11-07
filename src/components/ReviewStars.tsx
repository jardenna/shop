import ReviewStarsInfo from '../features/shop/components/reviews/ReviewStarsInfo';
import { getStarsArray } from '../features/shop/components/reviews/reviewsUtil.';
import variables from '../scss/variables.module.scss';
import { IconName } from '../types/enums';
import Icon from './icons/Icon';

interface ReviewStarsProps {
  rating: number;
  className?: string;
}

const ReviewStars = ({ rating, className }: ReviewStarsProps) => {
  const stars = getStarsArray(rating);

  return (
    <div className={className}>
      <ul className="star-list" aria-hidden={true}>
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
