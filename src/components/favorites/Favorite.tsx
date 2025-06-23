import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';
import VisuallyHidden from '../VisuallyHidden';

type FavoriteProps = {
  id: string;
  checked?: boolean;
  onChange?: () => void;
};

const Favorite = ({ onChange, id, checked }: FavoriteProps) => {
  const { language } = useLanguage();

  return (
    <div className="checkbox-item">
      <label htmlFor={id}>
        <VisuallyHidden>{language.heart}</VisuallyHidden>
      </label>
      <input
        type="checkbox"
        id={id}
        className="visually-hidden"
        onChange={onChange}
        checked={checked}
      />
      <span className="product-favorite-icon">
        <Icon title={language.heart} iconName={IconName.Heart} />
      </span>
    </div>
  );
};

export default Favorite;
