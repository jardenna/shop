import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';
import VisuallyHidden from '../VisuallyHidden';
import useFavorites from './useFavorites';

type FavoriteProps = {
  id: string;
};

const Favorite = ({ id }: FavoriteProps) => {
  const { language } = useLanguage();
  const { isFavorite, toggleFavorite, isTogglingLoading } = useFavorites();

  const handleChange = (id: string) => {
    toggleFavorite(id);
  };

  return (
    <div className="checkbox-item">
      <label htmlFor={id}>
        <Icon title={language.heart} iconName={IconName.Heart} />
        <VisuallyHidden>{language.heart}</VisuallyHidden>
      </label>
      <input
        type="checkbox"
        id={id}
        className="visually-hidden"
        onChange={() => {
          handleChange(id);
        }}
        checked={isFavorite(id)}
        disabled={isTogglingLoading}
      />
    </div>
  );
};

export default Favorite;
