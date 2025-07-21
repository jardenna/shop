import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import { ColorOption } from '../../utils/colorUtils';
import { resolveIconName } from '../../utils/iconHelpers';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import ProductList from '../productLists/ProductList';
import ProductListItem from '../productLists/ProductListItem';

type ColorListChooseSingletProps = {
  colorList: ColorOption[];
  initialChecked: string;
  name: string;
  errorText?: string;
  iconName?: string;
  optionGroupTitle?: string;
  onChange: (event: ChangeInputType) => void;
};

const ColorListChooseSingle = ({
  initialChecked,
  onChange,
  errorText,
  optionGroupTitle,
  name,
  iconName,
  colorList,
}: ColorListChooseSingletProps) => {
  const { language } = useLanguage();

  return (
    <ProductList
      ariaId={name}
      optionGroupTitle={optionGroupTitle}
      errorText={errorText}
    >
      {colorList.map(({ label, value, color }) => (
        <div key={label}>
          <ProductListItem
            key={color}
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
        </div>
      ))}
    </ProductList>
  );
};

export default ColorListChooseSingle;
