import type { Status } from '../../app/api/apiTypes/adminApiTypes';
import type { SubCategoriesWithParent } from '../../app/api/apiTypes/subCategoryApiTypes';
import { useLanguage } from '../../features/language/useLanguage';
import { useFormValidation } from '../../hooks/useFormValidation';
import { translateKey } from '../../utils/utils';
import SelectboxNew from './SelectboxNew';
import StatusOptionsNew from './StatusOptionsNew';

export interface CategoryProps {
  label: string;
  status: Status;
  value: string;
}

interface InitialStateValues {
  category: CategoryProps;
}

interface SelectFieldProps {
  subCategories: SubCategoriesWithParent[];
}

const SelectField = ({ subCategories }: SelectFieldProps) => {
  const { language } = useLanguage();

  const parentCategoryOptions = subCategories.map(
    ({ label, parentCategoryName, categoryId, categoryStatus }) => ({
      label: `${language[parentCategoryName.toLowerCase()]} / ${translateKey(label, language)}`,
      value: categoryId,
      status: categoryStatus,
    }),
  );

  const initialState: InitialStateValues = {
    category: parentCategoryOptions[0],
  };

  const { values, onSelectChange } = useFormValidation({
    initialState,
  });

  return (
    <SelectboxNew
      name="category"
      labelText="CategoryProps"
      options={parentCategoryOptions}
      value={values.category}
      onChange={onSelectChange}
      id="category"
      components={{ Option: StatusOptionsNew }}
    />
  );
};

export default SelectField;
