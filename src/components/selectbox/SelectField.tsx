import type { Status } from '../../app/api/apiTypes/adminApiTypes';
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
  subCategory: CategoryProps;
}

interface SelectFieldProps {
  subCategories: SubCategoriesWithParent[];
}

const SelectField = ({ subCategories }: SelectFieldProps) => {
  const { language } = useLanguage();

  const parentCategoryOptions = subCategories.map(
    ({ parentCategoryName, categoryId, categoryStatus, translationKey }) => ({
      label: `${language[parentCategoryName.toLowerCase()]} / ${translateKey(translationKey, language)}`,
      value: categoryId,
      status: categoryStatus,
    }),
  );

  const initialState: InitialStateValues = {
    subCategory: parentCategoryOptions[0],
  };

  const { values, onSelectChange, errors } = useFormValidation({
    initialState,
    validate: validateProductNew,
  });

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
