import { ChangeEvent } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';
import VisuallyHidden from '../VisuallyHidden';
import './_favorites.scss';
import useFavorites from './useFavorites';

type FavoritesProps = {
  id: string;
};

const Favorites = ({ id }: FavoritesProps) => {
  const { language } = useLanguage();
  const { isFavorite, toggleFavorite, isTogglingLoading, animate } =
    useFavorites({ id });

  const handleChange = (event: ChangeEvent) => {
    event.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <div className="favorites">
      <label htmlFor={id} className="favorites-label">
        <Icon
          title={language.heart}
          iconName={IconName.Heart}
          className={`heart-icon ${animate ? 'animate' : ''}`}
        />
        <VisuallyHidden>
          {animate || isFavorite(id)
            ? language.removeFromFavorit
            : language.saveAsFavorit}
        </VisuallyHidden>
      </label>
      <input
        type="checkbox"
        id={id}
        className="visually-hidden"
        onChange={handleChange}
        checked={isFavorite(id)}
        disabled={isTogglingLoading}
      />
    </div>
  );
};

export default Favorites;
