import { useAppSelector } from '../../../../app/hooks';
import { numberConvert } from '../../../../utils/numberConverter';
import { selectSelectedLanguage } from '../../../language/languageSlice';
import useLanguage from '../../../language/useLanguage';

const ReviewStarsInfo = ({ rating }: { rating: number }) => {
  const { language } = useLanguage();
  const selectedLanguage = useAppSelector(selectSelectedLanguage);
  return (
    <>
      {language.rated} {numberConvert(rating, selectedLanguage)}{' '}
      {language.outOf} 5 {language.stars}
    </>
  );
};

export default ReviewStarsInfo;
