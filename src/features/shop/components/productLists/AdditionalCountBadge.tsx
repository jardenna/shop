import VisuallyHidden from '../../../../components/VisuallyHidden';
import useLanguage from '../../../language/useLanguage';

type AdditionalCountBadgeProps = {
  count: number;
};
const AdditionalCountBadge = ({ count }: AdditionalCountBadgeProps) => {
  const { language } = useLanguage();
  return (
    <span>
      <VisuallyHidden>
        {language.thereAre} {count} {language.additionalColorsCount}
      </VisuallyHidden>
      <span>{`+ ${count}`}</span>
    </span>
  );
};

export default AdditionalCountBadge;
