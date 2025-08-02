import useLanguage from '../../features/language/useLanguage';
import variables from '../../scss/variables.module.scss';
import type { OptionGroupHeading } from '../../types/types';
import { getColorOptions } from '../../utils/colorUtils';
import { sliceAndCountHidden } from '../../utils/utils';
import ProductList from './ProductList';
import ProductListItem, { ProductLabelVariant } from './ProductListItem';

type ColorListProps = {
  colors: string[];
  count?: number;
  groupTitle?: OptionGroupHeading;
  variant?: ProductLabelVariant;
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
  const { visibleItems, hiddenCount } = sliceAndCountHidden(
    colorList,
    shownColorLength,
  );

  return (
    <ProductList groupTitle={groupTitle} className="color-list">
      {visibleItems.map(({ label, color, border }) => (
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
      {hiddenCount > 0 && <li>{`+ ${hiddenCount}`}</li>}
    </ProductList>
  );
};

export default ColorList;
