import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import { resolveIconName } from '../../utils/iconHelpers';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import ProductList from './ProductList';
import ProductSizeItem from './ProductSizeItem';

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
        <ProductSizeItem
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
        </ProductSizeItem>
      ))}
    </ProductList>
  );
};

export default ColorListChooseSingle;
