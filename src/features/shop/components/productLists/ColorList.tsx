import variables from '../../../../scss/variables.module.scss';
import { getColorOptions } from '../../../../utils/colorUtils';
import { sliceAndCountHidden, translateKey } from '../../../../utils/utils';
import { useLanguage } from '../../../language/useLanguage';
import AdditionalCountBadge from './AdditionalCountBadge';
import ProductList from './ProductList';
import type { ProductLabelVariant } from './ProductListItem';
import ProductListItem from './ProductListItem';

interface ColorListProps {
  colors: string[];
  variant: ProductLabelVariant;
  count?: number;
}

const ColorList = ({ count, colors, variant }: ColorListProps) => {
  const { language } = useLanguage();

  const colorList = getColorOptions({
    colors,
    language,
    borderColor: variables.colorIconBorder,
  });

  // Calculate how many colors to show and how many are hidden
  const { visibleItems, additionalOptionsCount } = sliceAndCountHidden(
    colorList,
    count ?? colorList.length,
  );

  return (
    <ProductList variant="color" title={language.colours}>
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
      {additionalOptionsCount > 0 && (
        <li>
          <AdditionalCountBadge count={additionalOptionsCount} />
        </li>
      )}
    </ProductList>
  );
};

export default ColorList;
