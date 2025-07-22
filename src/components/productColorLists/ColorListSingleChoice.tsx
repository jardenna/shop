import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import { ProductListChoiceProps } from '../../types/types';
import { ColorOption } from '../../utils/colorUtils';
import { resolveIconName } from '../../utils/iconHelpers';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import ProductList from '../productLists/ProductList';
import ProductListItem from '../productLists/ProductListItem';

type ColorListSingleChoiceProps = ProductListChoiceProps & {
  colorList: ColorOption[];
  initialChecked: string;
  iconName?: string;
};

const ColorListSingleChoice = ({
  initialChecked,
  onChange,
  groupTitle,
  name,
  iconName,
  colorList,
}: ColorListSingleChoiceProps) => {
  const { language } = useLanguage();

  return (
    <ProductList groupTitle={groupTitle}>
      {colorList.map(({ label, value, color }) => (
        <ProductListItem
          key={label}
          htmlFor={color}
          ariaLabel={getlowerCaseFirstLetter(value, language)}
          text={color}
          iconName={iconName ? resolveIconName(iconName) : IconName.Woman}
          variant="large"
          className="choose-color-list-item"
        >
          <input
            type="radio"
            name={name}
            id={color}
            value={value}
            checked={initialChecked === value}
            onChange={onChange}
          />
        </ProductListItem>
      ))}
    </ProductList>
  );
};

export default ColorListSingleChoice;
