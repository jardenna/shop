import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import { resolveIconName } from '../../utils/iconHelpers';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import OptionGroupTitle from '../formElements/radiobuttons/OptionGroupTitle';
import ProductSizeItem from './ProductSizeItem';
import ProductSizeList from './ProductSizeList';

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
    <>
      {optionGroupTitle && (
        <OptionGroupTitle
          errorText={errorText}
          text={optionGroupTitle}
          id={name}
        />
      )}
      <ProductSizeList ariaId={name}>
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
      </ProductSizeList>
    </>
  );
};

export default ColorListChooseSingle;
