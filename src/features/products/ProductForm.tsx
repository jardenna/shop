import { Product, ProductRequest } from '../../app/api/apiTypes';
import useDatePicker from '../../components/datePicker/useDatePicker';
import Form from '../../components/Form';
import { OptionType } from '../../components/selectbox/Selectbox';
import SharedCategoryInputs from '../../components/SharedCategoryInputs';
import useFormValidation from '../../hooks/useFormValidation';
import useLanguage from '../language/useLanguage';

type ProductFormProps = {
  id: string | null;
  selectedProduct: Product | null;
};

const ProductForm = ({ id, selectedProduct }: ProductFormProps) => {
  const { language } = useLanguage();

  const initialState: ProductRequest = {
    brand: '',
    colors: [],
    quantity: 0,
    description: '',
    image: '',
    material: '',
    price: 0,
    discount: 0,
    productName: '',
    productStatus: 'Inactive',
    sizes: [],
  };

  const selectedTime = selectedProduct?.scheduledDate;
  const { onChange, values, onSubmit, errors, onCustomChange } =
    useFormValidation({
      initialState,
      callback: handleSubmitProduct,
    });

  const { handleTimeChange, handleDaySelect, selectedDate, timeValue } =
    useDatePicker({ initialTime: selectedTime });

  const handleSelectStatus = (name: string, selectedOptions: OptionType) => {
    onCustomChange(name, selectedOptions.value);
  };

  function handleSubmitProduct() {
    console.log(12);
  }

  return (
    <Form
      onSubmit={onSubmit}
      submitBtnLabel={id ? language.save : language.create}
    >
      <SharedCategoryInputs
        categoryNamevalue={values.productName}
        categoryNameId="subCategoryName"
        categoryNameErrorText={language[errors.subCategoryName]}
        categoryNameLabelText={language.categoryName}
        categoryNamePlaceholder={language.categoryName}
        onCategoryNameChange={onChange}
        defaultStatusValue={{
          label: language[values.productStatus.toLowerCase()],
          value: values.productStatus,
        }}
        onSelectStatus={(selectedOptions: OptionType) => {
          handleSelectStatus('productStatus', selectedOptions);
        }}
        status={values.productStatus}
        onSelectDate={handleDaySelect}
        selectedDate={selectedDate}
        timeValue={timeValue}
        onTimeChange={handleTimeChange}
      />
    </Form>
  );
};

export default ProductForm;
