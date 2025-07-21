import useLanguage from '../../features/language/useLanguage';
import variables from '../../scss/variables.module.scss';
import { getColorOptions } from '../../utils/colorUtils';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import ProductList from '../productLists/ProductList';
import ProductListItem from '../productLists/ProductListItem';
import VisuallyHidden from '../VisuallyHidden';

type ColorReadOnlytProps = {
  ariaId: string;
  colors: string[];
  count?: number;
  optionGroupTitle?: string;
};

const ColorReadOnly = ({
  optionGroupTitle,
  ariaId,
  count = 3,
  colors,
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
    <ProductList ariaId={ariaId} optionGroupTitle={optionGroupTitle}>
      {visibleColors.map(({ label, value, color, border }) => (
        <div key={label}>
          <ProductListItem
            key={color}
            as="span"
            ariaLabel={getlowerCaseFirstLetter(value, language)}
            className="color-list-item"
            style={{
              backgroundColor: color,
              borderColor: border,
            }}
          >
            <VisuallyHidden>{label}</VisuallyHidden>
          </ProductListItem>
        </div>
      ))}
      {hiddenColorsCount > 0 && <span>{`+ ${hiddenColorsCount}`}</span>}
    </ProductList>
  );
};

export default ColorReadOnly;
