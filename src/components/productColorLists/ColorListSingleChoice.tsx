import useLanguage from '../../features/language/useLanguage';
import { ProductListChoiceProps } from '../../types/types';
import { ColorOption } from '../../utils/colorUtils';
import { resolveIconName } from '../../utils/iconHelpers';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import ProductList from '../productLists/ProductList';
import ProductListItem from '../productLists/ProductListItem';

type ColorListSingleChoiceProps = ProductListChoiceProps & {
  colorList: ColorOption[];
  iconName: string;
  initialChecked: string;
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
          text={color}
          variant="large"
          className="choose-color-list-item"
          icon={{
            iconName: resolveIconName(iconName),
            ariaLabel: getlowerCaseFirstLetter(value, language),
            title: '',
          }}
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
