import { ChangeEvent } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import ErrorBoundaryFallback from '../ErrorBoundaryFallback';
import Icon from '../icons/Icon';
import VisuallyHidden from '../VisuallyHidden';
import './_favorites-heart.scss';
import useFavorites from './useFavorites';

type FavoriteHeartProps = {
  id: string;
};

const FavoriteHeart = ({ id }: FavoriteHeartProps) => {
  const { language } = useLanguage();
  const { isFavorite, toggleFavorite, animate, isTogglingLoading, onReset } =
    useFavorites({ id });

  const handleChange = (event: ChangeEvent) => {
    event.stopPropagation();
    if (!isTogglingLoading) {
      toggleFavorite(id);
    }
  };

  return (
    <div className="favorite-heart">
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={onReset}
      >
        <label htmlFor={id} className="favorites-label">
          <Icon
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
          disabled={isTogglingLoading || undefined}
        />
      </ErrorBoundary>
    </div>
  );
};

export default FavoriteHeart;
