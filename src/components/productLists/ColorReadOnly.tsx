import useLanguage from '../../features/language/useLanguage';
import variables from '../../scss/variables.module.scss';
import type { OptionGroupHeading } from '../../types/types';
import { getColorOptions } from '../../utils/colorUtils';
import ProductList from './ProductList';
import ProductListItem, { ProductLabelVariant } from './ProductListItem';

type ColorReadOnlytProps = {
  colors: string[];
  count?: number;
  groupTitle?: OptionGroupHeading;
  variant?: ProductLabelVariant;
};

const ColorReadOnly = ({
  count = 3,
  colors,
  groupTitle,
  variant,
}: ColorReadOnlytProps) => {
  const { language } = useLanguage();

  const colorList = getColorOptions({
    colors,
    language,
    borderColor: variables.colorIconBorder,
  });

  // Calculate how many colors to show and how many are hidden
  const visibleColors = colorList.slice(0, count);
  const hiddenColorsCount = Math.max(colorList.length - count, 0);

  return (
    <ProductList groupTitle={groupTitle} className="color-list">
      {visibleColors.map(({ label, color, border }) => (
        <ProductListItem
          key={color}
          ariaLabel={label}
          variant={variant}
          style={{
            backgroundColor: color,
            borderColor: border,
          }}
        />
      ))}
      {hiddenColorsCount > 0 && <li>{`+ ${hiddenColorsCount}`}</li>}
    </ProductList>
  );
};

export default ColorReadOnly;
