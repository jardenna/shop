/* eslint-disable no-underscore-dangle */
import { useRef } from 'react';
import { Product, ProductRequest } from '../../app/api/apiTypes';
import useDatePicker from '../../components/datePicker/useDatePicker';
import FieldSet from '../../components/fieldset/FieldSet';
import Form from '../../components/Form';
import Checkbox, {
  CheckboxItems,
} from '../../components/formElements/Checkbox';
import FileInput from '../../components/formElements/fileInput/FileInput';
import Input from '../../components/formElements/Input';
import Textarea from '../../components/formElements/Textarea';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import ModalContainer from '../../components/modal/ModalContainer';
import ColorOptions from '../../components/selectbox/ColorOptions';
import Selectbox, { OptionType } from '../../components/selectbox/Selectbox';
import StatusOptions from '../../components/selectbox/StatusOptions';
import StatusInputs from '../../components/StatusInputs';
import useFormValidation from '../../hooks/useFormValidation';
import { SizeVariant } from '../../types/enums';
import { useGetAllCategoriesQuery } from '../categories/categoriyApiSlice';
import useLanguage from '../language/useLanguage';
import { useGetSubCategoriesWithParentQuery } from '../subCategories/subCategoryApiSlice';
import SubCategoryForm from '../subCategories/SubCategoryForm';
import { useUploadImageMutation } from '../uploadImageApiSlice';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from './productApiSlice';

type ProductFormProps = {
  id: string | null;
  selectedProduct: Product | null;
};

type ErrorWithMessage = {
  data?: {
    message?: string;
  };
};
const ProductForm = ({ id, selectedProduct }: ProductFormProps) => {
  const { language } = useLanguage();
  const formRef = useRef<HTMLFormElement | null>(null);

  const { data: subCategories, isLoading } =
    useGetSubCategoriesWithParentQuery();

  const parentCategoryOptions = subCategories?.map(
    ({ label, parentCategoryName, value, categoryStatus }) => ({
      label: `${parentCategoryName} / ${label}`,
      value,
      status: categoryStatus,
    }),
  );

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const colorOptions = [
    { label: language.black, value: 'black' },
    { label: language.grey, value: 'grey' },
    { label: language.brown, value: 'brown' },
    { label: language.white, value: 'white', border: '#66606d' },
    { label: language.blue, value: 'blue' },
    { label: language.yellow, value: 'yellow' },
    { label: language.orange, value: 'orange' },
    { label: language.red, value: 'red' },
    { label: language.purple, value: 'purple' },
  ];

  const checkboxItems: CheckboxItems[] = [
    { label: 'S' },
    { label: 'M' },
    { label: 'L' },
    { label: 'XL' },
  ];

  const [uploadImages] = useUploadImageMutation();

  const selectedCategory = selectedProduct?.subCategory._id ?? '';

  const defaultCategoryValue = parentCategoryOptions?.find(
    (category) => category.value === selectedCategory,
  );

  const initialState: ProductRequest = {
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
    subCategory: selectedCategory,
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

  const { data: allCategories } = useGetAllCategoriesQuery();
  const { onAddMessagePopup } = useMessagePopup();

  const { handleTimeChange, handleDaySelect, selectedDate, timeValue } =
    useDatePicker({ initialTime: selectedTime });

  const handleSelectStatus = (name: string, selectedOptions: OptionType) => {
    onCustomChange(name, selectedOptions.value);
  };

  const handleSelectColors = (name: string, selectedOptions: OptionType[]) => {
    const selectedValues = selectedOptions.map((option) => option.value);

    onCustomChange(name, selectedValues);
  };

  const handleSelectCategory = (name: string, selectedOptions: OptionType) => {
    onCustomChange(name, selectedOptions.value);
  };

  async function handleSubmitProduct() {
    try {
      const formData = new FormData();
      filesData.forEach((file) => {
        formData.append('images', file);
      });

      const uploadResponse = await uploadImages(formData).unwrap();
      const imageUrl = uploadResponse.images;

      const productData = {
        ...values,
        images: imageUrl,
      };
      if (id) {
        await updateProduct({ id, product: productData }).unwrap();
        onAddMessagePopup({
          messagePopupType: 'success',
          message: language.categoryUpdated,
        });
      } else {
        await createProduct(productData).unwrap();
        onAddMessagePopup({
          messagePopupType: 'success',
          message: language.categoryCreated,
        });
      }
    } catch (error: unknown) {
      const err = error as ErrorWithMessage;
      const message =
        err.data?.message ??
        (error instanceof Error ? error.message : language.somethingWentWrong);

      onAddMessagePopup({
        messagePopupType: 'error',
        message,
        componentType: 'notification',
      });
    }
  }

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
                id="colors"
                name="colors"
                closeMenuOnSelect={false}
                labelText={language.colours}
                options={colorOptions}
                components={{ Option: ColorOptions }}
                isSearchable
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
              <div className="flex">
                <Selectbox
                  id="subCategory"
                  ref={formRef}
                  name="subCategory"
                  labelText={language.category}
                  options={parentCategoryOptions ? parentCategoryOptions : []}
                  components={{ Option: StatusOptions }}
                  isLoading={isLoading}
                  defaultValue={defaultCategoryValue}
                  isSearchable
                  onChange={(selectedOptions: OptionType) => {
                    handleSelectCategory('subCategory', selectedOptions);
                  }}
                />
                {id && (
                  <ModalContainer
                    triggerModalBtnContent="+"
                    id={id}
                    modalSize={SizeVariant.Sm}
                    modalHeaderText="modalHeaderText"
                  >
                    {allCategories && (
                      <SubCategoryForm
                        selectedCategory={null}
                        id={null}
                        parentCategories={allCategories.categories}
                      />
                    )}
                  </ModalContainer>
                )}
              </div>
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
