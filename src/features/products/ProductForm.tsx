import { Product, ProductRequest } from '../../app/api/apiTypes';
import useDatePicker from '../../components/datePicker/useDatePicker';
import FieldSet from '../../components/fieldset/FieldSet';
import Form from '../../components/Form';
import Input from '../../components/formElements/Input';
import Textarea from '../../components/formElements/Textarea';
import { OptionType } from '../../components/selectbox/Selectbox';
import StatusInputs from '../../components/StatusInputs';
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
    <>
      {/* <ImageUploadForm /> */}
      <Form
        onSubmit={onSubmit}
        submitBtnLabel={id ? language.save : language.create}
      >
        <FieldSet legendText="Product information">
          <Input
            value={values.productName}
            id="productName"
            name="productName"
            errorText={language[errors.productName]}
            labelText={language.categoryName}
            placeholder={language.categoryName}
            onChange={onChange}
            required
          />

          <Textarea
            value={values.description}
            name="description"
            id="description"
            labelText="Description"
            onChange={onChange}
          />
        </FieldSet>
        <FieldSet legendText="Product status">
          <StatusInputs
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
        </FieldSet>
      </Form>
    </>
  );
};

export default ProductForm;
