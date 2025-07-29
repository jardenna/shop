import {
  MainCategoryNames,
  Size,
  SubCategoryNames,
} from '../../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant, SizeVariant } from '../../types/enums';
import { ProductListChoiceProps } from '../../types/types';
import { getDisplaySizes } from '../../utils/sizeUtils';
import { PrimaryActionBtnProps } from '../modal/Modal';
import ModalContainer from '../modal/ModalContainer';
import ProductList from './ProductList';

type SizeListSingleChoiceProps = ProductListChoiceProps & {
  availableSizeList: Size[];
  categoryName: MainCategoryNames;
  initialChecked: string;
  subCategoryName: SubCategoryNames;
};

const SizeListSingleChoice = ({
  initialChecked,
  onChange,
  groupTitle,
  name,
  availableSizeList,
  categoryName,
  subCategoryName,
}: SizeListSingleChoiceProps) => {
  const { language } = useLanguage();
  const displaySizeList = getDisplaySizes({
    mainKey: categoryName,
    subKey: subCategoryName,
    availableSizes: availableSizeList,
  });
  const primaryActionBtn: PrimaryActionBtnProps = {
    onClick: () => {
      console.log(12);
    },
    label: language.delete,
    variant: BtnVariant.Primary,
  };
  return (
    <>
      <div> Valgt størrelse: XXL Udsolgt</div>
      <ProductList groupTitle={groupTitle}>
        {displaySizeList.map((size) => (
          <li key={size} className="product-list-item size-list-item">
            {availableSizeList.includes(size) ? (
              <>
                <label htmlFor={size} className="product-label">
                  {size}
                </label>
                <input
                  type="radio"
                  name={name}
                  id={size}
                  value={size}
                  checked={initialChecked === size}
                  onChange={onChange}
                />
              </>
            ) : (
              <ModalContainer
                triggerModalBtnContent={size}
                triggerModalBtnVariant={BtnVariant.Ghost}
                triggerModalClassName="product-label text-line-through"
                id={size}
                primaryActionBtn={primaryActionBtn}
                modalSize={SizeVariant.Sm}
                modalHeaderText=" Størrelse XXL er udsolgt"
              >
                Vil du have besked, hvis den kommer på lager igen?
              </ModalContainer>
            )}
          </li>
        ))}
      </ProductList>
    </>
  );
};

export default SizeListSingleChoice;
