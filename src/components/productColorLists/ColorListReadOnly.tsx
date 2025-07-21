import useLanguage from '../../features/language/useLanguage';
import variables from '../../scss/variables.module.scss';
import { getColorOptions } from '../../utils/colorUtils';
import './_product-color-list.scss';
import ProductColorItem from './ProductColorItem';

type OptionSize = 'small' | '';

type ProductColorListProps = {
  colours: string[];
  count?: number;
  optionSize?: OptionSize;
};

const ColorListReadOnly = ({
  colours,
  count = 3,
  optionSize = '',
}: ProductColorListProps) => {
  const { language } = useLanguage();

  const colorList = getColorOptions({
    colors: colours,
    language,
    borderColor: variables.colorIconBorder,
  });

  // Calculate how many colors to show and how many are hidden
  const visibleColors = colorList.slice(0, count);
  const hiddenColorsCount = Math.max(colorList.length - count, 0);

  return (
    <ul
      className={`color-list ${optionSize}`}
      aria-label={language.availableColors}
    >
      {visibleColors.map(({ label, color, border }) => (
        <ProductColorItem
          key={label}
          style={{
            backgroundColor: color,
            borderColor: border,
          }}
          ariaLabel={label}
        />
      ))}
      {hiddenColorsCount > 0 && <li>{`+ ${hiddenColorsCount}`}</li>}
    </ul>
  );
};

export default ColorListReadOnly;
