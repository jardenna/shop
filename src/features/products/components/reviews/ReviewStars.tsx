import Icon from '../../../../components/icons/Icon';
import VisuallyHidden from '../../../../components/VisuallyHidden';
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
    <VisuallyHidden>
      <ReviewStarsInfo rating={rating} />
    </VisuallyHidden>
    <ul className="star-list">
      {stars.map((type, index) => (
        <li key={index} className="star-item" aria-hidden={true}>
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
    <span>{Math.round(rating * 10) / 10}</span>
  </div>
);

export default ReviewStars;
