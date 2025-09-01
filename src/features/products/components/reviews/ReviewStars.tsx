import { useAppSelector } from '../../../../app/hooks';
import Icon from '../../../../components/icons/Icon';
import variables from '../../../../scss/variables.module.scss';
import { IconName } from '../../../../types/enums';
import { numberConvert } from '../../../../utils/numberConverter';
import { selectSelectedLanguage } from '../../../language/languageSlice';
import useLanguage from '../../../language/useLanguage';

type ReviewStarsProps = {
  rating: number;
  stars: ('full' | 'half' | 'empty')[];
};

const ReviewStars = ({ stars, rating }: ReviewStarsProps) => {
  const { language } = useLanguage();
  const selectedLanguage = useAppSelector(selectSelectedLanguage);
  return (
    <div className="stars">
      {language.rated} {numberConvert(rating, selectedLanguage)}{' '}
      {language.outOf} 5 {language.stars}
      <div>
        {stars.map((type, index) => (
          <span key={index} className="star">
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
    </div>
  );
};

export default ReviewStars;
