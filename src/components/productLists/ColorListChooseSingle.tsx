import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import { resolveIconName } from '../../utils/iconHelpers';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import ProductList from './ProductList';
import ProductListItem from './ProductListItem';

type ColorListChooseSingletProps = {
  initialChecked: string;
  name: string;
  sizeList: string[];
  errorText?: string;
  iconName?: string;
  optionGroupTitle?: string;
  onChange: (event: ChangeInputType) => void;
};

const ColorListChooseSingle = ({
  initialChecked,
  sizeList,
  onChange,
  errorText,
  optionGroupTitle,
  name,
  iconName,
}: ColorListChooseSingletProps) => {
  const { language } = useLanguage();

  return (
    <ProductList
      ariaId={name}
      optionGroupTitle={optionGroupTitle}
      errorText={errorText}
    >
      {sizeList.map((color) => (
        <ProductListItem
          key={color}
          htmlFor={color}
          ariaLabel={getlowerCaseFirstLetter(color, language)}
          text={color}
          iconName={iconName ? resolveIconName(iconName) : IconName.Woman}
        >
          <input
            type="radio"
            name={name}
            id={color}
            value={color}
            checked={initialChecked === color}
            onChange={onChange}
          />
        </ProductListItem>
      ))}
    </ProductList>
  );
};

export default ColorListChooseSingle;
