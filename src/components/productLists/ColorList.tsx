import useLanguage from '../../features/language/useLanguage';
import variables from '../../scss/variables.module.scss';
import type { OptionGroupHeading } from '../../types/types';
import { getColorOptions } from '../../utils/colorUtils';
import { sliceAndCountHidden, translateKey } from '../../utils/utils';
import ProductList from './ProductList';
import type { ProductLabelVariant } from './ProductListItem';
import ProductListItem from './ProductListItem';

type ColorListProps = {
  colors: string[];
  variant: ProductLabelVariant;
  count?: number;
  groupTitle?: OptionGroupHeading;
};

const ColorList = ({ count, colors, groupTitle, variant }: ColorListProps) => {
  const { language } = useLanguage();

  const colorList = getColorOptions({
    colors,
    language,
    borderColor: variables.colorIconBorder,
  });

  // Calculate how many colors to show and how many are hidden
  const shownColorLength = count ? count : colorList.length;
  const { visibleItems, additionalColorsCount } = sliceAndCountHidden(
    colorList,
    shownColorLength,
  );

  return (
    <ProductList groupTitle={groupTitle} className="color-list">
      {visibleItems.map(({ color, border, value }) => (
        <ProductListItem
          key={color}
          variant={variant}
          screenReaderText={translateKey(value, language)}
          style={{
            backgroundColor: color,
            borderColor: border,
          }}
        />
      ))}
      {additionalColorsCount > 0 && (
        <li className="additional-colors-badge">{`+ ${additionalColorsCount}`}</li>
      )}
    </ProductList>
  );
};

export default ColorList;
