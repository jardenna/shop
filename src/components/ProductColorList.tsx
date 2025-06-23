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
  count,
  optionSize = '',
}: ProductColorListProps) => {
  const { language } = useLanguage();
  const colorsMaxLength = count ? colours.length - count : 0;
  const drop = (arr: string[], n = 1) => arr.slice(n);

  return (
    <div>
      <ul
        className={`color-list ${optionSize}`}
        aria-label={language.availableColors}
      >
        {drop(colours, colorsMaxLength || 0).map((colour) => (
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
      </ul>
      <span>{colorsMaxLength > 0 && `+ ${colorsMaxLength}`}</span>
    </div>
  );
};

export default ProductColorList;
