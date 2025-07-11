import useLanguage from '../features/language/useLanguage';
import variables from '../scss/variables.module.scss';
import VisuallyHidden from './VisuallyHidden';

type OptionSize = 'small' | '';

type ProductColorListProps = {
  colours: string[];
  count?: number;
  optionSize?: OptionSize;
};

const ProductColorList = ({
  colours,
  count = 3,
  optionSize = '',
}: ProductColorListProps) => {
  const { language } = useLanguage();

  // Calculate how many colors to show and how many are hidden
  const visibleColors = colours.slice(0, count);
  const hiddenColorsCount = Math.max(colours.length - count, 0);

  return (
    <ul
      className={`color-list ${optionSize}`}
      aria-label={language.availableColors}
    >
      {visibleColors.map((colour) => (
        <li
          key={colour}
          style={{
            backgroundColor: colour,
            borderColor: colour === 'white' ? variables.colorIconBorder : '',
          }}
          className="option-box"
        >
          <VisuallyHidden>{colour}</VisuallyHidden>
        </li>
      ))}
      {hiddenColorsCount > 0 && <li>{`+ ${hiddenColorsCount}`}</li>}
    </ul>
  );
};

export default ProductColorList;
