import VisuallyHidden from '../../../../components/VisuallyHidden';
import { useLanguage } from '../../../language/useLanguage';

const ReviewStarsInfo = ({ rating }: { rating: number }) => {
  const { language } = useLanguage();

  return (
    <span>
      {rating === 0 && language.notRatedYet}

      {rating > 0 && (
        <VisuallyHidden>
          {language.rating}: {rating} {language.outOf} 5 {language.stars}
        </VisuallyHidden>
      )}
    </span>
  );
};

export default ReviewStarsInfo;
