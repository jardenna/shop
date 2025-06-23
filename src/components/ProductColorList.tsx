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
  console.log(colours.length, count);
  const { language } = useLanguage();

  return (
    <ul
      className={`color-list ${optionSize}`}
      aria-label={language.availableColors}
    >
      {colours.map((colour) => (
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
  );
};

export default ProductColorList;
