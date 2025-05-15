import useLanguage from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import IconContent from '../../IconContent';

const MissingImage = () => {
  const { language } = useLanguage();
  return (
    <span className="missing-img">
      <IconContent
        iconName={IconName.Image}
        size="50"
        title={language.trashCan}
        ariaLabel={language.adminCannotBeDeleted}
      />
    </span>
  );
};

export default MissingImage;
