import { useLanguage } from '../../../features/language/useLanguage';
import IconContent from '../../IconContent';

const MissingImage = () => {
  const { language } = useLanguage();
  return (
    <span className="missing-img">
      <IconContent
        iconName="image"
        size="50"
        ariaLabel={language.adminCannotBeDeleted}
      />
    </span>
  );
};

export default MissingImage;
