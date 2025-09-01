import type { DisplyReviews } from '../../../../app/api/apiTypes/shopApiTypes';
import { useAppSelector } from '../../../../app/hooks';
import Icon from '../../../../components/icons/Icon';
import variables from '../../../../scss/variables.module.scss';
import { IconName } from '../../../../types/enums';
import { numberConvert } from '../../../../utils/numberConverter';
import { selectSelectedLanguage } from '../../../language/languageSlice';
import useLanguage from '../../../language/useLanguage';
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
  const { language } = useLanguage();
  const selectedLanguage = useAppSelector(selectSelectedLanguage);
  const stars = [...Array(5).keys()].map((star) => {
    const diff = rating - star;

    if (diff > 0.75) {
      return 'full';
    }
    if (diff >= 0.25) {
      return 'half';
    }
    return 'empty';
  });

  return (
    <div>
      <section className="review-display">
        {language.rated} {numberConvert(rating, selectedLanguage)}{' '}
        {language.outOf} 5 {language.stars}
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
        <span>antal reviews {numOfReviews}</span>
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
