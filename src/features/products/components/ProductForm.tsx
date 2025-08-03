/* eslint-disable no-underscore-dangle */
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import type {
  Product,
  ProductRequest,
  SubCategoriesWithParent,
} from '../../../app/api/apiTypes/adminApiTypes';
import useDatePicker from '../../../components/datePicker/useDatePicker';
import Form from '../../../components/form/Form';
import CheckboxControls from '../../../components/formElements/controlGroup/CheckboxControls';
import Input from '../../../components/formElements/Input';
import Textarea from '../../../components/formElements/Textarea';
import ToggleSwitch from '../../../components/formElements/toggleSwitch/ToggleSwitch';
import validateProduct from '../../../components/formElements/validation/validateProduct';
import GridTwoCol from '../../../components/GridTwoCol';
import useMessagePopup from '../../../components/messagePopup/useMessagePopup';
import ColorOptions from '../../../components/selectbox/ColorOptions';
import Selectbox from '../../../components/selectbox/Selectbox';
import StatusOptions from '../../../components/selectbox/StatusOptions';
import StatusInputs from '../../../components/StatusInputs';
import useFormValidation from '../../../hooks/useFormValidation';
import { AdminPath } from '../../../layout/nav/enums';
import variables from '../../../scss/variables.module.scss';
import type { OptionType } from '../../../types/types';
import { colorList, getColorOptions } from '../../../utils/colorUtils';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import ProductDiscountPrice from '../../currency/components/ProductDiscountPrice';
import useCurrency from '../../currency/useCurrency';
import useLanguage from '../../language/useLanguage';
import { useUploadImageMutation } from '../../uploadImageApiSlice';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from '../productApiSlice';
import FormCard from './FormCard';
import ImageUpload from './ImageUpload';

type ProductFormProps = {
  allowedSizes: string[];
  id: string | null;
  images: string[];
  parentCategories: SubCategoriesWithParent[];
  selectedProduct: Product | null;
  onReset: () => void;
};

const ProductForm = ({
  id,
  selectedProduct,
  parentCategories,
  onReset,
  images,
  allowedSizes,
}: ProductFormProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const formRef = useRef<HTMLFormElement | null>(null);

  // Options and initial state
  const parentCategoryOptions = parentCategories.map(
    ({ label, parentCategoryName, categoryId, categoryStatus }) => ({
      label: `${parentCategoryName} / ${label}`,
      value: categoryId,
      status: categoryStatus,
    }),
  );

  const sortedColorList = getColorOptions({
    colors: colorList,
    language,
    borderColor: variables.colorIconBorder,
  });

  const handleSelectCategory = (name: string, selectedOptions: OptionType) => {
    onCustomChange(name, selectedOptions.value);
  };

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
    subCategory: selectedProduct?.subCategory._id ?? '',
  };

  const defaultColorValue = selectedProduct?.colors.map((color) => ({
    label: language[color],
    value: color,
  }));

  const defaultCategoryValue = parentCategoryOptions.find(
    (category) => category.value === selectedProduct?.subCategory._id,
  );

  const selectedTime = selectedProduct?.scheduledDate;
  const uploadedImg = selectedProduct?.images || [];

  const [showPrice, setShowPrice] = useState(false);
  const [disabledImages, setDisabledImages] = useState<string[]>([]);

  // Helper functions
  const handleGoback = () => {
    navigate(-1);
  };

  const handleToggleImage = (img: string) => {
    setDisabledImages(
      disabledImages.includes(img)
        ? disabledImages.filter((i: string) => i !== img)
        : [...disabledImages, img],
    );
  };

  const activeImages = uploadedImg.filter(
    (img) => !disabledImages.includes(img),
  );

  const handleSelectStatus = (name: string, selectedOptions: OptionType) => {
    onCustomChange(name, selectedOptions.value);
  };

  const handleSelectColors = (name: string, selectedOptions: OptionType[]) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    onCustomChange(name, selectedValues);
  };

  // Hooks
  const {
    onChange,
    values,
    onSubmit,
    errors,
    onCustomChange,
    filesData,
    previewData,
    removePreviewImage,
    onBlur,
  } = useFormValidation({
    initialState,
    validate: validateProduct,
    callback: handleSubmitProduct,
  });

  const { onAddMessagePopup } = useMessagePopup();
  const { handleTimeChange, handleDaySelect, selectedDate, timeValue } =
    useDatePicker({ initialTime: selectedTime });
  const { currencyText } = useCurrency();

  const handleShowPrice = () => {
    setShowPrice(!showPrice);
  };

  // Redux hooks
  const [uploadImages] = useUploadImageMutation();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  // Submit handler
  async function handleSubmitProduct() {
    try {
      const formData = new FormData();

      if (filesData.length > 0) {
        filesData.forEach((file) => {
          formData.append('images', file);
        });

        const uploadResponse = await uploadImages(formData).unwrap();
        const currentUploadedImages = uploadResponse.images;

        // Combine existing images with newly uploaded images
        values.images = [...activeImages, ...currentUploadedImages];
      } else {
        // Retain existing images if no new files are uploaded
        values.images = activeImages;
      }

      const productData = { ...values, scheduledDate: selectedDate };

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

      navigate(AdminPath.AdminProducts);
    } catch (error: any) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
    }
  }

  // allowedSizes
  const selectedCategory = parentCategories.find(
    (category) => values.subCategory === category.categoryId,
  );

  const availableSizes = selectedCategory
    ? selectedCategory.allowedSizes
    : allowedSizes;

  return (
    <Form
      onSubmit={onSubmit}
      submitBtnLabel={id ? language.save : language.create}
      ref={formRef}
      onCancel={handleGoback}
    >
      <div className="form-container">
        <div className="flex-2">
          <FormCard legendText={language.category} onReset={onReset}>
            <Selectbox
              errorText={language[errors.subCategory]}
              id="subCategory"
              name="subCategory"
              labelText={language.category}
              options={parentCategoryOptions}
              components={{ Option: StatusOptions }}
              defaultValue={defaultCategoryValue}
              isSearchable
              onChange={(selectedOptions: OptionType) => {
                handleSelectCategory('subCategory', selectedOptions);
              }}
              required
            />
          </FormCard>
          <FormCard legendText={language.productImages} onReset={onReset}>
            <ImageUpload
              images={images}
              onBlur={onBlur}
              errors={errors}
              ariaLabel={`${language.delete} ${language.image}`}
              onChange={onChange}
              previewData={previewData}
              onRemovePreviewImage={(name: string) => {
                removePreviewImage(name);
              }}
              onToggleImage={(id) => {
                handleToggleImage(id);
              }}
              disabledImages={disabledImages}
            />
          </FormCard>
          <FormCard legendText={language.productInformation} onReset={onReset}>
            <Input
              value={values.productName}
              id="productName"
              name="productName"
              errorText={language[errors.productName]}
              labelText={language.productName}
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
          </FormCard>
        </div>
        <div className="flex-1">
          <FormCard legendText={language.productVariants} onReset={onReset}>
            <Selectbox
              id="colors"
              name="colors"
              errorText={language[errors.colors]}
              closeMenuOnSelect={false}
              labelText={language.colours}
              options={sortedColorList}
              components={{ Option: ColorOptions }}
              isSearchable
              defaultValue={defaultColorValue}
              isMulti
              onChange={(values: OptionType[]) => {
                handleSelectColors('colors', values);
              }}
              required
            />
            <CheckboxControls
              options={availableSizes}
              name="sizes"
              onChange={onChange}
              values={values.sizes}
              required
              groupTitle={{
                title: language.sizes,
                id: 'choose-product-sizes',
                errorText: language[errors.sizes],
              }}
            />
          </FormCard>
          <FormCard legendText={language.pricing} onReset={onReset}>
            <div className="flex">
              <Input
                type="number"
                value={values.price || ''}
                id="price"
                name="price"
                errorText={language[errors.price]}
                labelText={language.price}
                onChange={onChange}
                required
                inputSuffix={currencyText}
              />
              <Input
                type="number"
                value={values.discount || ''}
                id="discount"
                name="discount"
                labelText={language.discount}
                onChange={onChange}
                inputSuffix="%"
              />
            </div>
            <div className="grid grid-two-col">
              <ToggleSwitch
                id="show-price"
                checked={showPrice}
                onChange={handleShowPrice}
                labelText="showPrice"
              />
              {showPrice && (
                <ProductDiscountPrice
                  price={values.price}
                  discount={values.discount}
                />
              )}
            </div>
          </FormCard>
          <FormCard legendText={language.details} onReset={onReset}>
            <StatusInputs
              labelText={language.productStatus}
              ref={formRef}
              defaultStatusValue={{
                label: getlowerCaseFirstLetter(values.productStatus, language),
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
            <div>
              <Input
                value={values.quantity || ''}
                type="number"
                id="quantity"
                name="quantity"
                labelText={language.addToStock}
                onChange={onChange}
              />
              {selectedProduct && (
                <GridTwoCol text={language.productsInStock}>
                  {selectedProduct.countInStock} {language.items}
                </GridTwoCol>
              )}
            </div>
          </FormCard>
        </div>
      </div>
    </Form>
  );
};

export default ProductForm;
