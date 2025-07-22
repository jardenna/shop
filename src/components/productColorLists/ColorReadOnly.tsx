import useLanguage from '../../features/language/useLanguage';
import variables from '../../scss/variables.module.scss';
import { getColorOptions } from '../../utils/colorUtils';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import { OptionGroupTitle1 } from '../productLists/OptionGroupTitle';
import ProductList from '../productLists/ProductList';
import ProductListItem from '../productLists/ProductListItem';
import VisuallyHidden from '../VisuallyHidden';

type ColorReadOnlytProps = {
  colors: string[];
  count?: number;
  groupTitle?: OptionGroupTitle1;
};

const ColorReadOnly = ({
  count = 3,
  colors,
  groupTitle,
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
      {visibleColors.map(({ label, value, color, border }) => (
        <ProductListItem
          key={color}
          as="span"
          ariaLabel={getlowerCaseFirstLetter(value, language)}
          className="option-box"
          style={{
            backgroundColor: color,
            borderColor: border,
          }}
        >
          <VisuallyHidden>{label}</VisuallyHidden>
        </ProductListItem>
      ))}
      {hiddenColorsCount > 0 && <span>{`+ ${hiddenColorsCount}`}</span>}
    </ProductList>
  );
};

export default ColorReadOnly;
