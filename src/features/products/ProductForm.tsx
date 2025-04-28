import { Product, ProductRequest } from '../../app/api/apiTypes';
import useDatePicker from '../../components/datePicker/useDatePicker';
import FieldSet from '../../components/fieldset/FieldSet';
import Form from '../../components/Form';
import Checkbox, {
  CheckboxItems,
} from '../../components/formElements/Checkbox';
import Input from '../../components/formElements/Input';
import Textarea from '../../components/formElements/Textarea';
import MultiSelectbox from '../../components/selectbox/MultiSelectbox';
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

  const colorOptions = [
    { label: language.black, value: 'black' },
    { label: 'orange', value: 2 },
    { label: 'kiwi', value: 3 },
  ];

  const checkboxItems: CheckboxItems[] = [
    { label: 'S' },
    { label: 'M' },
    { label: 'L' },
    { label: 'X' },
    { label: 'XL' },
  ];

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
    sizes: ['S', 'M'],
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

          <Input
            value={values.brand}
            id="brand"
            name="brand"
            errorText={language[errors.brand]}
            labelText="brand"
            onChange={onChange}
            required
          />
          <Input
            value={values.price}
            id="price"
            name="price"
            errorText={language[errors.price]}
            labelText="price"
            onChange={onChange}
            required
          />
          <Input
            value={values.material}
            id="material"
            name="material"
            errorText={language[errors.material]}
            labelText="material"
            onChange={onChange}
            required
          />
          <Input
            value={values.quantity}
            id="quantity"
            name="quantity"
            errorText={language[errors.quantity]}
            labelText="quantity"
            onChange={onChange}
            required
          />
          <Input
            type="number"
            value={values.discount || 0}
            id="discount"
            name="discount"
            labelText="discount"
            onChange={onChange}
          />

          <Textarea
            value={values.description}
            name="description"
            id="description"
            labelText="Description"
            onChange={onChange}
          />
        </FieldSet>
        <fieldset>
          <legend>Choose an option</legend>
          <Checkbox
            onChange={onChange}
            values={values.sizes}
            checkBoxList={checkboxItems}
            name="sizes"
          />
        </fieldset>
        <FieldSet legendText="Product Variants">
          <MultiSelectbox
            id="colors"
            name="colors"
            labelText="Colors"
            options={colorOptions}
            isSearchable
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
