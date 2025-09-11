import Icon from '../../../../components/icons/Icon';
import variables from '../../../../scss/variables.module.scss';
import { IconName } from '../../../../types/enums';
import ReviewStarsInfo from './ReviewStarsInfo';
import { StarType } from './reviewsUtil.';

type ReviewStarsProps = {
  rating: number;
  stars: StarType[];
};

const ReviewStars = ({ stars, rating }: ReviewStarsProps) => (
  <div className="stars">
    <ul className="star-list" aria-hidden={true}>
      {stars.map((type, index) => (
        <li key={index} className="star-item">
          {type === 'full' && (
            <Icon
              iconName={IconName.Star}
              title=""
              fill={variables.colorYellow}
            />
          )}
          {type === 'half' && <Icon iconName={IconName.HalfStar} title="" />}
          {type === 'empty' && <Icon iconName={IconName.Star} title="" />}
        </li>
      ))}
    </ul>
    <ReviewStarsInfo rating={rating} />
  </div>
);

export default ReviewStars;
