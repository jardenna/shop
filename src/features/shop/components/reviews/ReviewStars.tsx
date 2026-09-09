import Icon from '../../../../components/icons/Icon';
import variables from '../../../../scss/variables.module.scss';
import { IconName } from '../../../../types/enums';
import ReviewStarsInfo from './ReviewStarsInfo';
import { StarType } from './reviewsUtil.';

type ReviewStarsProps = {
  rating: number;
  stars: StarType[];
  className?: string;
};

const ReviewStars = ({ stars, rating, className = '' }: ReviewStarsProps) => (
  <div className="stars">
    <ul className={`star-list ${className}`} aria-hidden={true}>
      {stars.map((type, index) => (
        <li key={index} className="star-item">
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

export default ReviewStars;
