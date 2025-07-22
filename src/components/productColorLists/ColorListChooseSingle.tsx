import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import { ColorOption } from '../../utils/colorUtils';
import { resolveIconName } from '../../utils/iconHelpers';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import { OptionGroupTitle1 } from '../productLists/OptionGroupTitle';
import ProductList from '../productLists/ProductList';
import ProductListItem from '../productLists/ProductListItem';

type ColorListChooseSingletProps = {
  colorList: ColorOption[];
  initialChecked: string;
  name: string;
  errorText?: string;
  groupTitle?: OptionGroupTitle1;
  iconName?: string;
  onChange: (event: ChangeInputType) => void;
};

const ColorListChooseSingle = ({
  initialChecked,
  onChange,
  errorText,
  groupTitle,
  name,
  iconName,
  colorList,
}: ColorListChooseSingletProps) => {
  const { language } = useLanguage();

  return (
    <ProductList groupTitle={groupTitle} errorText={errorText}>
      {colorList.map(({ label, value, color }) => (
        <ProductListItem
          key={label}
          htmlFor={color}
          ariaLabel={getlowerCaseFirstLetter(value, language)}
          text={color}
          iconName={iconName ? resolveIconName(iconName) : IconName.Woman}
          className="color-list-item"
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

export default ColorListChooseSingle;
