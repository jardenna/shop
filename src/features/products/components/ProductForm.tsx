/* eslint-disable no-underscore-dangle */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import type {
  Product,
  ProductRequest,
  SubCategoriesWithParent,
} from '../../../app/api/apiTypes/adminApiTypes';
import { useAppDispatch } from '../../../app/hooks';
import useDatePicker from '../../../components/datePicker/useDatePicker';
import Form from '../../../components/form/Form';
import ControlGroupList from '../../../components/formElements/controlGroup/ControlGroupList';
import Input from '../../../components/formElements/Input';
import Textarea from '../../../components/formElements/Textarea';
import ToggleSwitch from '../../../components/formElements/toggleSwitch/ToggleSwitch';
import LabelValueGrid from '../../../components/labelValueGrid/LabelValueGrid';
import useMessagePopup from '../../../components/messagePopup/useMessagePopup';
import ColorOptions from '../../../components/selectbox/ColorOptions';
import Selectbox from '../../../components/selectbox/Selectbox';
import StatusOptions from '../../../components/selectbox/StatusOptions';
import StatusInputs from '../../../components/StatusInputs';
import useFormValidation from '../../../hooks/useFormValidation';
import { AdminPath } from '../../../layout/nav/enums';
import variables from '../../../scss/variables.module.scss';
import type { OptionType } from '../../../types/types';
import { getColorOptions } from '../../../utils/colorUtils';
import handleApiError from '../../../utils/handleApiError';
import { maxFiles, translateKey } from '../../../utils/utils';
import validateProduct from '../../../utils/validation/validateProduct';
import ProductPrice from '../../currency/components/productPrice/ProductPrice';
import useCurrency from '../../currency/useCurrency';
import handleImageUpload from '../../imageUploads/handleImageUpload';
import useLanguage from '../../language/useLanguage';
import { useUploadImageMutation } from '../../uploadImageApiSlice';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from '../productApiSlice';
import FormCard from './FormCard';
import ImageUpload from './ImageUpload';
import './productForm.styles.scss';

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
    onChangeTextArea,
    filesData,
    previewData,
    removePreviewImage,
    onFileChange,
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
  const [createProduct, { isLoading: isCreateLoading }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const dispatch = useAppDispatch();

  // Submit handler
  async function handleSubmitProduct() {
    try {
      //  upload logic
      const mergedImages = await handleImageUpload({
        id,
        activeImages,
        filesData,
        uploadImages,
        dispatch,
      });

      values.images = mergedImages;

      const filteredSizes = values.sizes.filter((size) =>
        availableSizes.includes(size),
      );

      const productData = {
        ...values,
        sizes: filteredSizes,
        scheduledDate: selectedDate,
      };

      if (id) {
        await updateProduct({
          id,
          product: productData,
        }).unwrap();
      } else {
        await createProduct(productData).unwrap();
      }

      onAddMessagePopup({
        message: id ? language.productUpdated : language.productCreated,
        withDelay: true,
      });

      navigate(AdminPath.AdminProducts);
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  }

  // allowedSizes
  const selectedCategory = parentCategories.find(
    (category) => values.subCategory === category.categoryId,
  );

  const availableSizes = selectedCategory
    ? selectedCategory.allowedSizes
    : allowedSizes;

  useEffect(() => {
    // Only keep sizes that are still allowed in the new category
    if (availableSizes.length) {
      const filteredSizes = values.sizes.filter((size) =>
        availableSizes.includes(size),
      );
      if (filteredSizes.length !== values.sizes.length) {
        onCustomChange('sizes', filteredSizes);
      }
    }
  }, [availableSizes, values.sizes, onCustomChange]);

  return (
    <Form
      onSubmit={onSubmit}
      submitBtnLabel={id ? language.save : language.create}
      ref={formRef}
      onCancel={handleGoback}
      isLoading={isLoading || isCreateLoading}
    >
      <div className="product-form-container">
        <div className="product-form-left-column">
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
          <FormCard
            legendText={`${language.productImages} (${language.maximum} ${maxFiles})`}
            onReset={onReset}
          >
            <ImageUpload
              images={images}
              onChange={onFileChange}
              previewData={previewData}
              removePreviewImage={removePreviewImage}
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
              onChange={onChangeTextArea}
              required
            />
            <div className="product-form-2-columns">
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
        <div className="product-form-right-column">
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
            <ControlGroupList
              options={availableSizes}
              name="sizes"
              type="checkbox"
              onChange={onChange}
              values={values.sizes}
              required
              inputInfo={
                availableSizes.length === 0 ? language.sizeInfoText : undefined
              }
              groupTitle={{
                title: language.sizes,
                id: 'choose-product-sizes',
                errorText: language[errors.sizes],
              }}
            />
          </FormCard>
          <FormCard legendText={language.pricing} onReset={onReset}>
            <div className="product-form-2-columns">
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
                inputMode="numeric"
              />
              <Input
                type="number"
                value={values.discount || ''}
                id="discount"
                name="discount"
                labelText={language.discount}
                onChange={onChange}
                inputSuffix="%"
                inputMode="numeric"
              />
            </div>
            <div className="product-form-2-columns">
              <ToggleSwitch
                id="show-price"
                checked={showPrice}
                onChange={handleShowPrice}
                labelText="showPrice"
              />
              {showPrice && (
                <ProductPrice
                  price={values.price}
                  discountPrice={values.discount}
                />
              )}
            </div>
          </FormCard>
          <FormCard legendText={language.details} onReset={onReset}>
            <StatusInputs
              labelText={language.productStatus}
              ref={formRef}
              defaultStatusValue={{
                label: translateKey(values.productStatus, language),
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
                inputMode="numeric"
              />
              {selectedProduct && (
                <LabelValueGrid text={language.productsInStock}>
                  {selectedProduct.countInStock} {language.pcs}
                </LabelValueGrid>
              )}
            </div>
          </FormCard>
        </div>
      </div>
    </Form>
  );
};

export default ProductForm;
