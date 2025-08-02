import useLanguage from '../../features/language/useLanguage';
import variables from '../../scss/variables.module.scss';
import type { OptionGroupHeading } from '../../types/types';
import { getColorOptions } from '../../utils/colorUtils';
import ProductList from '../productLists/ProductList';
import ProductListItem, {
  ProductLabelVariant,
} from '../productLists/ProductListItem';

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

  const colorList1 = getColorOptions({
    colors,
    language,
    borderColor: variables.colorIconBorder,
  });

  // Calculate how many colors to show and how many are hidden
  const visibleColors = colorList1.slice(0, count);
  const hiddenColorsCount = Math.max(colorList1.length - count, 0);

  return (
    <ProductList groupTitle={groupTitle}>
      {visibleColors.map(({ label, color, border }) => (
        <ProductListItem
          ariaLabel={label}
          key={color}
          variant={variant}
          style={{
            backgroundColor: color,
            borderColor: border,
          }}
          className="color-list-item"
        />
      ))}
      {hiddenColorsCount > 0 && <li>{`+ ${hiddenColorsCount}`}</li>}
    </ProductList>
  );
};

export default ColorReadOnly;
