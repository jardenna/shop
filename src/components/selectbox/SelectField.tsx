import type { Status } from '../../app/api/apiTypes/adminApiTypes';
import type { Product } from '../../app/api/apiTypes/adminProductApiTypes';
import type { Size } from '../../app/api/apiTypes/sharedApiTypes';
import type { SubCategoriesWithParent } from '../../app/api/apiTypes/subCategoryApiTypes';
import { useLanguage } from '../../features/language/useLanguage';
import { useFormValidation } from '../../hooks/useFormValidation';
import { translateKey } from '../../utils/utils';
import { validateProductNew } from '../../utils/validation/validateProductNew';
import SelectboxNew from './SelectboxNew';
import StatusOptionsNew from './StatusOptionsNew';

export interface CategoryProps {
  label: string;
  status: Status;
  value: string;
}

export interface InitialStateValues {
  brand: string | null;
  colors: string[];
  description: string;
  discount: number;
  images: string[];
  material: string;
  price: number;
  productName: string;
  productStatus: Status;
  quantity: number;
  sizes: Size[];
  subCategory: CategoryProps | null;
  scheduledDate?: Date;
}
interface SelectFieldProps {
  parentCategories: SubCategoriesWithParent[];
  selectedProduct: Product | null;
  selectedSubCategoryId: string | null;
}

const SelectField = ({
  parentCategories,
  selectedSubCategoryId,
  selectedProduct,
}: SelectFieldProps) => {
  const { language } = useLanguage();

  const parentCategoryOptions = parentCategories.map(
    ({ parentCategoryName, categoryId, categoryStatus, translationKey }) => ({
      label: `${language[parentCategoryName.toLowerCase()]} / ${translateKey(translationKey, language)}`,
      value: categoryId,
      status: categoryStatus,
    }),
  );

  const subCategory =
    parentCategoryOptions.find(
      ({ value }) => value === selectedSubCategoryId,
    ) ?? null;

  const initialState: InitialStateValues = {
    subCategory,
    brand: selectedProduct?.brand ?? '',
    colors: selectedProduct?.colors ?? [],
    quantity: selectedProduct?.quantity ?? 0,
    description: selectedProduct?.description ?? '',
    images: selectedProduct?.images ?? [],
    material: selectedProduct?.material ?? '',
    price: selectedProduct?.price ?? 0,
    discount: selectedProduct?.discount ?? 0,
    productName: selectedProduct?.productName ?? '',
    productStatus: selectedProduct?.productStatus ?? 'Inactive',
    sizes: selectedProduct?.sizes ?? [],
  };

  const { values, onSelectChange, errors } = useFormValidation({
    initialState,
    validate: validateProductNew,
  });

  console.log(values);

  return (
    <SelectboxNew
      errorText={language[errors.subCategory]}
      name="subCategory"
      labelText={language.category}
      options={parentCategoryOptions}
      value={values.subCategory}
      onChange={onSelectChange}
      id="subCategory"
      isSearchable
      components={{ Option: StatusOptionsNew }}
      required
    />
  );
};

export default SelectField;
