import Icon from '../../../../components/icons/Icon';
import VisuallyHidden from '../../../../components/VisuallyHidden';
import variables from '../../../../scss/variables.module.scss';
import { IconName } from '../../../../types/enums';
import ReviewStarsInfo from './ReviewStarsInfo';
import { StarType } from './reviewsUtil.';

type ReviewStarsProps = {
  rating: number;
  stars: StarType[];
  showReviewStarInfo?: boolean;
};

const ReviewStars = ({
  stars,
  rating,
  showReviewStarInfo,
}: ReviewStarsProps) => (
  <div className="stars">
    {showReviewStarInfo ? (
      <ReviewStarsInfo rating={rating} />
    ) : (
      <VisuallyHidden>
        <ReviewStarsInfo rating={rating} />
      </VisuallyHidden>
    )}
    {stars.map((type, index) => (
      <span key={index} className="star" aria-hidden={true}>
        {type === 'full' && (
          <Icon
            iconName={IconName.Star}
            title=""
            fill={variables.colorYellow}
          />
        )}
        {type === 'half' && <Icon iconName={IconName.HalfStar} title="" />}
        {type === 'empty' && <Icon iconName={IconName.Star} title="" />}
      </span>
    ))}
  </div>
);

export default ReviewStars;
