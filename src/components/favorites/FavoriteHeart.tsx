import { ChangeEvent } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';
import VisuallyHidden from '../VisuallyHidden';
import './_favorites-heart.scss';
import useFavorites from './useFavorites';

type FavoriteHeartProps = {
  id: string;
};

const FavoriteHeart = ({ id }: FavoriteHeartProps) => {
  const { language } = useLanguage();
  const { isFavorite, toggleFavorite, animate, isTogglingLoading } =
    useFavorites({ id });

  const handleChange = (event: ChangeEvent) => {
    event.stopPropagation();
    if (!isTogglingLoading) {
      toggleFavorite(id);
    }
  };

  return (
    <div className="favorite-heart">
      <label htmlFor={id} className="favorites-label">
        <Icon
          title={language.heart}
          iconName={IconName.Heart}
          className={`heart-icon ${animate ? 'animate' : ''}`}
        />
        <VisuallyHidden>
          {animate || isFavorite(id)
            ? language.removeFromFavorite
            : language.saveAsFavorit}
        </VisuallyHidden>
      </label>
      <input
        type="checkbox"
        id={id}
        className="visually-hidden"
        onChange={handleChange}
        checked={isFavorite(id)}
        aria-disabled={isTogglingLoading || undefined}
      />
    </div>
  );
};

export default FavoriteHeart;
