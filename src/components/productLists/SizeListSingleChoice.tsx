import {
  MainCategoryNames,
  Size,
  SubCategoryNames,
} from '../../app/api/apiTypes/sharedApiTypes';
import { NotifyMeModalProps } from '../../features/shop/components/ShopProductForm';
import { ProductListChoiceProps } from '../../types/types';
import { getDisplaySizes } from '../../utils/sizeUtils';
import { PrimaryActionBtnProps } from '../modal/Modal';
import ProductList from './ProductList';

type SizeListSingleChoiceProps = ProductListChoiceProps & {
  availableSizeList: Size[];
  categoryName: MainCategoryNames;
  initialChecked: string;
  subCategoryName: SubCategoryNames;
  primaryActionBtn?: PrimaryActionBtnProps;
  triggerModal?: NotifyMeModalProps;
};

const SizeListSingleChoice = ({
  initialChecked,
  onChange,
  groupTitle,
  name,
  availableSizeList,
  categoryName,
  subCategoryName,
  primaryActionBtn,
  triggerModal,
}: SizeListSingleChoiceProps) => {
  const displaySizeList = getDisplaySizes({
    mainKey: categoryName,
    subKey: subCategoryName,
    availableSizes: availableSizeList,
  });

  return (
    <ProductList
      groupTitle={groupTitle}
      primaryActionBtn={primaryActionBtn}
      triggerModal={triggerModal}
    >
      {displaySizeList.map((size) => (
        <li key={size} className="product-list-item size-list-item">
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
            disabled={!availableSizeList.includes(size)}
          />
        </li>
      ))}
    </ProductList>
  );
};

export default SizeListSingleChoice;
