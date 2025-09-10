import { useAppSelector } from '../../../../app/hooks';
import VisuallyHidden from '../../../../components/VisuallyHidden';
import { numberConvert } from '../../../../utils/numberConverter';
import { selectSelectedLanguage } from '../../../language/languageSlice';
import useLanguage from '../../../language/useLanguage';

const ReviewStarsInfo = ({ rating }: { rating: number }) => {
  const { language } = useLanguage();
  const selectedLanguage = useAppSelector(selectSelectedLanguage);
  return (
    <span>
      {numberConvert(rating, selectedLanguage)}
      <VisuallyHidden>
        {language.outOf} 5 {language.stars}
      </VisuallyHidden>
    </span>
  );
};

export default ReviewStarsInfo;
