/* eslint-disable no-underscore-dangle */
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Product,
  ProductRequest,
  SubCategoriesWithParent,
} from '../../app/api/apiTypes';
import Button from '../../components/Button';
import useDatePicker from '../../components/datePicker/useDatePicker';
import FieldSet from '../../components/fieldset/FieldSet';
import Form from '../../components/Form';
import Checkbox, {
  CheckboxItems,
} from '../../components/formElements/Checkbox';
import FileInput from '../../components/formElements/fileInput/FileInput';
import Input from '../../components/formElements/Input';
import Textarea from '../../components/formElements/Textarea';
import validateProduct from '../../components/formElements/validation/validateProduct';
import GridTwoCol from '../../components/GridTwoCol';
import Icon from '../../components/icons/Icon';
import Img from '../../components/Img';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import ColorOptions from '../../components/selectbox/ColorOptions';
import Selectbox, { OptionType } from '../../components/selectbox/Selectbox';
import StatusOptions from '../../components/selectbox/StatusOptions';
import StatusInputs from '../../components/StatusInputs';
import useFormValidation from '../../hooks/useFormValidation';
import { MainPath } from '../../layout/nav/enums';
import variables from '../../scss/variables.module.scss';
import { BtnVariant, IconName } from '../../types/enums';
import { discountCalculation } from '../../utils/utils';
import ProductPrice from '../currency/components/ProductPrice';
import useLanguage from '../language/useLanguage';
import { useUploadImageMutation } from '../uploadImageApiSlice';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from './productApiSlice';

type ProductFormProps = {
  id: string | null;
  isLoading: boolean;
  parentCategories: SubCategoriesWithParent[];
  selectedProduct: Product | null;
};

const ProductForm = ({
  id,
  selectedProduct,
  parentCategories,
  isLoading,
}: ProductFormProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const formRef = useRef<HTMLFormElement | null>(null);

  const parentCategoryOptions = parentCategories.map(
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
    {
      label: language.white,
      value: 'white',
      border: variables.colorIconBorder,
    },
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

  const defaultCategoryValue = parentCategoryOptions.find(
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
    sizes: selectedProduct?.sizes ?? ['S', 'M', 'L', 'XL'],
    subCategory: selectedCategory,
  };

  const defaultColorValue = selectedProduct?.colors.map((color) => ({
    label: language[color],
    value: color,
  }));

  const selectedTime = selectedProduct?.scheduledDate;
  const {
    onChange,
    values,
    onSubmit,
    errors,
    onCustomChange,
    filesData,
    previewData,
    removePreviewImage,
  } = useFormValidation({
    initialState,
    validate: validateProduct,
    callback: handleSubmitProduct,
  });

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

  const [uploadedImg, setUploadedImg] = useState(selectedProduct?.images || []);
  const handleRemoveImg = (name: string) => {
    const image = uploadedImg.filter((img) => img !== name);
    setUploadedImg(image);
  };

  async function handleSubmitProduct() {
    try {
      const formData = new FormData();

      if (filesData.length > 0) {
        filesData.forEach((file) => {
          formData.append('images', file);
        });

        const uploadResponse = await uploadImages(formData).unwrap();
        const uploadedImages = uploadResponse.images;

        // Combine existing images with newly uploaded images
        values.images = [...uploadedImg, ...uploadedImages];
      } else {
        // Retain existing images if no new files are uploaded
        values.images = uploadedImg;
      }

      const productData = { ...values };

      if (id) {
        await updateProduct({
          id,
          product: productData,
        }).unwrap();

        onAddMessagePopup({
          messagePopupType: 'success',
          message: language.productUpdated,
        });
      } else {
        await createProduct(productData).unwrap();
        onAddMessagePopup({
          messagePopupType: 'success',
          message: language.productCreated,
        });
      }

      navigate(`/admin/${MainPath.AdminProducts}`);
    } catch (error: any) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
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
          <section className="form-card">
            <FieldSet legendText={language.productImages}>
              <ul className="preview-list">
                {uploadedImg.map((img) => (
                  <li key={img} className="preview-item">
                    <Img className="preview-img" src={img} alt="" />
                    <Button
                      variant={BtnVariant.Ghost}
                      onClick={() => {
                        handleRemoveImg(img);
                      }}
                      ariaLabel="ariaLabel"
                    >
                      <Icon iconName={IconName.Close} title="title" />
                    </Button>
                  </li>
                ))}
              </ul>
              <FileInput
                onChange={onChange}
                multiple
                required
                errorText={language[errors.images]}
                name="images"
                id="images"
                previewData={previewData}
                title={language.delete}
                ariaLabel={language.delete}
                onRemoveImg={(name: string) => {
                  removePreviewImage(name);
                }}
              />
            </FieldSet>
          </section>
          <section className="form-card">
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
                errorText={language[errors.description]}
                name="description"
                id="description"
                labelText={language.description}
                onChange={onChange}
                required
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
          <section className="form-card">
            <FieldSet legendText={language.productQuantity}>
              <Input
                value={values.quantity}
                id="quantity"
                name="quantity"
                labelText={language.addToStock}
                onChange={onChange}
              />
            </FieldSet>
            {selectedProduct && (
              <p>
                <strong>{language.productsInStockNow}: </strong>
                {selectedProduct.countInStock}
              </p>
            )}
          </section>
        </div>
        <div className="flex-1">
          <section className="form-card">
            <FieldSet legendText={language.productVariants}>
              <div>
                <span className="form-span-container">
                  {language.sizes}{' '}
                  <span className="error-message">
                    {language[errors.sizes]}
                  </span>
                </span>

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
                errorText={language[errors.colors]}
                closeMenuOnSelect={false}
                labelText={language.colours}
                options={colorOptions}
                components={{ Option: ColorOptions }}
                isSearchable
                defaultValue={defaultColorValue}
                isMulti
                onChange={(values: OptionType[]) => {
                  handleSelectColors('colors', values);
                }}
              />
            </FieldSet>
          </section>
          <section className="form-card">
            <FieldSet legendText={language.pricing}>
              <div className="flex">
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
              </div>

              {values.discount && (
                <GridTwoCol>
                  <strong>{language.newPrice}:</strong>
                  <ProductPrice
                    price={discountCalculation(values.price, values.discount)}
                  />
                </GridTwoCol>
              )}
            </FieldSet>
          </section>
          <section className="form-card">
            <FieldSet legendText={language.details}>
              <div className="flex">
                <Selectbox
                  errorText={language[errors.subCategory]}
                  id="subCategory"
                  name="subCategory"
                  labelText={language.category}
                  options={parentCategoryOptions}
                  components={{ Option: StatusOptions }}
                  isLoading={isLoading}
                  defaultValue={defaultCategoryValue}
                  isSearchable
                  onChange={(selectedOptions: OptionType) => {
                    handleSelectCategory('subCategory', selectedOptions);
                  }}
                />
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
