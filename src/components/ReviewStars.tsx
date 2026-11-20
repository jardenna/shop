import ReviewStarsInfo from '../features/shop/components/reviews/ReviewStarsInfo';
import { getStarsArray } from '../features/shop/components/reviews/reviewsUtil.';
import variables from '../scss/variables.module.scss';
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
          // eslint-disable-next-line @eslint-react/no-array-index-key
          <li key={index}>
            {type === 'full' && (
              <Icon iconName="star" fill={variables.colorYellow} />
            )}
            {type === 'half' && <Icon iconName="halfStar" />}
            {type === 'empty' && <Icon iconName="star" />}
          </li>
        ))}
      </ul>
      <ReviewStarsInfo rating={rating} />
    </div>
  );
};

export default ReviewStars;
