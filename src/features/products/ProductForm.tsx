import { useRef } from 'react';
import { Product, ProductRequest } from '../../app/api/apiTypes';
import useDatePicker from '../../components/datePicker/useDatePicker';
import FieldSet from '../../components/fieldset/FieldSet';
import Form from '../../components/Form';
import AddToInput from '../../components/formElements/AddToInput';
import Checkbox, {
  CheckboxItems,
} from '../../components/formElements/Checkbox';
import FileInput from '../../components/formElements/fileInput/FileInput';
import Input from '../../components/formElements/Input';
import Textarea from '../../components/formElements/Textarea';
import Selectbox, { OptionType } from '../../components/selectbox/Selectbox';
import StatusInputs from '../../components/StatusInputs';
import useFormValidation from '../../hooks/useFormValidation';
import useLanguage from '../language/useLanguage';
import { useUploadImageMutation } from '../uploadImageApiSlice';
import { useCreateProductMutation } from './productApiSlice';

type ProductFormProps = {
  id: string | null;
  selectedProduct: Product | null;
};

const ProductForm = ({ id, selectedProduct }: ProductFormProps) => {
  const { language } = useLanguage();
  const [createProduct] = useCreateProductMutation();

  const colorOptions = [
    { label: language.black, value: 'black' },
    { label: 'orange', value: 2 },
    { label: 'kiwi', value: 3 },
  ];

  const checkboxItems: CheckboxItems[] = [
    { label: 'S' },
    { label: 'M' },
    { label: 'L' },
    { label: 'XL' },
  ];

  const [uploadImages] = useUploadImageMutation();

  const initialState: ProductRequest = {
    brand: '',
    colors: [],
    quantity: 0,
    description: '',
    images: [],
    material: '',
    price: 0,
    discount: 0,
    productName: '',
    productStatus: 'Inactive',
    sizes: ['S', 'M'],
  };

  const selectedTime = selectedProduct?.scheduledDate;
  const {
    onChange,
    values,
    onSubmit,
    errors,
    onCustomChange,
    filesData,
    previewData,
  } = useFormValidation({
    initialState,
    callback: handleSubmitProduct,
  });

  const { handleTimeChange, handleDaySelect, selectedDate, timeValue } =
    useDatePicker({ initialTime: selectedTime });

  const handleSelectStatus = (name: string, selectedOptions: OptionType) => {
    onCustomChange(name, selectedOptions.value);
  };

  const handleSelectColors = (name: string, selectedOptions: OptionType[]) => {
    const selectedValues = selectedOptions.map((option) => option.value);

    onCustomChange(name, selectedValues);
  };

  async function handleSubmitProduct() {
    try {
      if (filesData.length === 0) {
        return;
      }

      const formData = new FormData();
      filesData.forEach((file) => {
        formData.append('images', file);
      });

      const uploadResponse = await uploadImages(formData).unwrap();
      const imageUrl = uploadResponse.images;

      const productData = {
        ...values,
        images: imageUrl,
        subCategory: '6800a3996970b670bca671bb',
      };

      await createProduct(productData).unwrap();
    } catch (error) {
      console.log(error);
    }
  }
  const formRef = useRef<HTMLFormElement | null>(null);
  return (
    <Form
      onSubmit={onSubmit}
      submitBtnLabel={id ? language.save : language.create}
      ref={formRef}
    >
      <div className="flex flex-align-start">
        <div className="flex-2">
          <section className="page-card">
            <FieldSet legendText={language.productImages}>
              <FileInput
                onChange={onChange}
                multiple
                required
                name="images"
                id="images"
                previewData={previewData}
                title={language.delete}
                ariaLabel={language.delete}
                onRemoveImg={() => {
                  console.log(1);
                }}
              />
            </FieldSet>
          </section>
          <section className="page-card">
            <FieldSet legendText={language.productInformation}>
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
                labelText={language.description}
                onChange={onChange}
              />
              <div className="flex">
                <Input
                  value={values.brand}
                  id="brand"
                  name="brand"
                  errorText={language[errors.brand]}
                  labelText={language.brand}
                  onChange={onChange}
                  required
                />
                <Input
                  value={values.material}
                  id="material"
                  name="material"
                  errorText={language[errors.material]}
                  labelText={language.material}
                  onChange={onChange}
                  required
                />
              </div>
            </FieldSet>
          </section>
          <section className="page-card">
            <FieldSet legendText={language.productQuantity}>
              <Input
                value={values.quantity}
                id="quantity"
                name="quantity"
                labelText={language.addToStock}
                onChange={onChange}
              />
            </FieldSet>
            Product in stock now: 54 Product in transit: 390 Last time
            restocked: 24th June, 2022
          </section>
        </div>
        <div className="flex-1">
          <section className="page-card">
            <FieldSet legendText={language.productVariants}>
              <div>
                <span className="form-label-container">{language.sizes}</span>
                <Checkbox
                  onChange={onChange}
                  values={values.sizes}
                  checkBoxList={checkboxItems}
                  name="sizes"
                />
              </div>
              <Selectbox
                ref={formRef}
                id="colors"
                name="colors"
                labelText={language.colours}
                options={colorOptions}
                isSearchable
                closeMenuOnSelect={false}
                isMulti
                onChange={(values: OptionType[]) => {
                  handleSelectColors('colors', values);
                }}
              />
            </FieldSet>
          </section>
          <section className="page-card">
            <FieldSet legendText={language.pricing} className="row">
              <Input
                value={values.price}
                id="price"
                name="price"
                errorText={language[errors.price]}
                labelText={language.price}
                onChange={onChange}
                required
              />
              <Input
                type="number"
                value={values.discount || 0}
                id="discount"
                name="discount"
                labelText={language.discount}
                onChange={onChange}
              />
            </FieldSet>
          </section>
          <section className="page-card">
            <FieldSet legendText={language.details}>
              <AddToInput
                ariaLabel="test"
                id="colors"
                labelText={language.category}
              >
                <Selectbox
                  id="colors"
                  ref={formRef}
                  name="colors"
                  labelText={language.category}
                  options={colorOptions}
                  inputHasNoLabel
                  isSearchable
                  onChange={(values: OptionType[]) => {
                    handleSelectColors('colors', values);
                  }}
                />
              </AddToInput>

              <StatusInputs
                labelText={language.productStatus}
                ref={formRef}
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
          </section>
        </div>
      </div>
    </Form>
  );
};

export default ProductForm;
