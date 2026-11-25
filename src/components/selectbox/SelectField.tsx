/* eslint-disable no-underscore-dangle */
import { useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation, useNavigate } from 'react-router';
import type { Product } from '../../app/api/apiTypes/adminProductApiTypes';
import type { Size } from '../../app/api/apiTypes/sharedApiTypes';
import type { SubCategoriesWithParent } from '../../app/api/apiTypes/subCategoryApiTypes';
import { useAppDispatch } from '../../app/hooks';
import { useCurrency } from '../../features/currency/useCurrency';
import { handleImageUpload } from '../../features/imageUploads/handleImageUpload';
import { useLanguage } from '../../features/language/useLanguage';
import ImageUpload from '../../features/products/components/ImageUpload';
import { useHandleImages } from '../../features/products/hooks/useHandleImages';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from '../../features/products/productApiSlice';
import ProductPrice from '../../features/shop/components/productPrice/ProductPrice';
import { useUploadImageMutation } from '../../features/uploadImageApiSlice';
import { useFormValidation } from '../../hooks/useFormValidation';
import { localStorageKeys, useLocalStorage } from '../../hooks/useLocalStorage';
import { AdminPath } from '../../layout/nav/navConstants';
import variables from '../../scss/variables.module.scss';
import { getColorOptions } from '../../utils/colorUtils';
import { findAvailableSizes } from '../../utils/sizeUtils';
import {
  maxDiscount,
  maxFiles,
  minDiscount,
  translateKey,
} from '../../utils/utils';
import { validateProduct } from '../../utils/validation/validateProduct';
import FormCard from '../carts/FormCard';
import { useDatePicker } from '../datePicker/useDatePicker';
import ErrorBoundaryFallback from '../ErrorBoundaryFallback';
import Form from '../Form';
import Input from '../formElements/Input';
import ProductOptionGroup from '../formElements/productOptionGroup/ProductOptionGroup';
import Textarea from '../formElements/Textarea';
import ToggleSwitch from '../formElements/toggleSwitch/ToggleSwitch';
import LabelValueGrid from '../labelValueGrid/LabelValueGrid';
import StatusInputsNew from '../StatusInputsNew';
import { useToast } from '../toast/hooks/useToast';
import ColorOptions from './ColorOptions';
import SelectboxNew from './SelectboxNew';
import StatusOptions from './StatusOptions';

interface SelectFieldProps {
  allowedSizes: Size[];
  id: string | null;
  images: string[];
  parentCategories: SubCategoriesWithParent[];
  selectedProduct: Product | null;
  refetch: () => void;
}

const SelectField = ({
  parentCategories,
  selectedProduct,
  images,
  id,
  allowedSizes,
  refetch,
}: SelectFieldProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef<HTMLFormElement | null>(null);
  const { language } = useLanguage();
  const { currencyText } = useCurrency();
  const { onAddToast } = useToast();
  const dispatch = useAppDispatch();

  const returnTo = location.state?.returnTo ?? AdminPath.AdminProducts;

  const selectedTime = selectedProduct?.scheduledDate;
  const uploadedImg = selectedProduct?.images || [];
  const sortedColorList = getColorOptions({
    language,
    borderColor: variables.colorIconBorder,
  });

  // Hooks
  const { handleTimeChange, handleDaySelect, selectedDate, timeValue } =
    useDatePicker({ initialTime: selectedTime });

  const { activeImages, isImageTouched, onToggleDisableImage, disabledImages } =
    useHandleImages({
      uploadedImg,
    });

  // Options
  const parentCategoryOptions = parentCategories.map(
    ({ parentCategoryName, categoryId, categoryStatus, translationKey }) => ({
      label: `${language[parentCategoryName.toLowerCase()]} / ${translateKey(translationKey, language)}`,
      value: categoryId,
      status: categoryStatus,
    }),
  );

  const initialState = {
    subCategory: selectedProduct?.subCategory._id ?? '',
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
  };

  const {
    values,
    onSelectChange,
    errors,
    onSubmit,
    onChange,
    onChangeTextArea,
    onFileChange,
    removePreviewImage,
    previewData,
    filesData,
    onBlur,
    isFormDirty,
  } = useFormValidation({
    initialState,
    validate: validateProduct,
    callback: handleSubmitProduct,
  });

  const [showPrice, setShowPrice] = useLocalStorage(
    localStorageKeys.showPrice,
    false,
  );

  // Helper functions
  const handleShowPrice = () => {
    setShowPrice(!showPrice);
  };

  const handleGoback = () => {
    navigate(-1);
  };

  const availableSizes = findAvailableSizes({
    parentCategories,
    selectedSubCategoryId: values.subCategory,
    allowedSizes,
  });

  // Redux hooks
  const [uploadImages] = useUploadImageMutation();

  const [createProduct, { isLoading: isCreateLoading }] =
    useCreateProductMutation();

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  // Submit handler
  async function handleSubmitProduct() {
    const mergedImages = await handleImageUpload({
      id,
      activeImages,
      filesData,
      uploadImages,
      dispatch,
    });

    const productData = {
      ...values,
      images: mergedImages,
      sizes: values.sizes.filter((size) => availableSizes.includes(size)),
      scheduledDate: selectedDate,
    };

    const result = await (
      id
        ? updateProduct({ id, product: productData })
        : createProduct(productData)
    ).unwrap();

    if (!result.success) {
      return;
    }

    onAddToast({
      message: result.message,
    });

    navigate(returnTo, { replace: true });
  }

  const isSubmitActive =
    previewData.length > 0 || isFormDirty || isImageTouched;

  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={() => {
        refetch();
      }}
    >
      <Form
        onSubmit={onSubmit}
        disabled={!!id && !isSubmitActive}
        isLoading={isLoading || isCreateLoading}
        submitBtnLabel={id ? language.save : language.create}
        ref={formRef}
        cancelBtnProps={{
          onCancel: handleGoback,
        }}
      >
        <section className="product-form-container">
          <article className="product-form-left-column">
            <FormCard legendText={language.category}>
              <SelectboxNew
                errorText={language[errors.subCategory]}
                name="subCategory"
                labelText={language.category}
                options={parentCategoryOptions}
                value={values.subCategory}
                onChange={onSelectChange}
                id="subCategory"
                isSearchable
                components={{ Option: StatusOptions }}
                required
              />
            </FormCard>
            <FormCard
              legendText={`${language.productImages} (${language.maximum} ${maxFiles})`}
            >
              <ImageUpload
                images={images}
                onChange={onFileChange}
                previewData={previewData}
                removePreviewImage={removePreviewImage}
                onToggleImage={(id) => {
                  onToggleDisableImage(id);
                }}
                disabledImages={disabledImages}
              />
            </FormCard>
            <FormCard legendText={language.productInformation}>
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
          </article>

          <article className="product-form-right-column">
            <FormCard legendText={language.productVariants}>
              <SelectboxNew
                id="colors"
                name="colors"
                errorText={language[errors.colors]}
                closeMenuOnSelect={false}
                labelText={language.colours}
                options={sortedColorList}
                components={{ Option: ColorOptions }}
                isSearchable
                value={values.colors}
                isMulti
                onChange={onSelectChange}
                required
              />

              <ProductOptionGroup
                options={availableSizes}
                name="sizes"
                type="checkbox"
                onChange={onChange}
                values={values.sizes}
                required
                inputInfo={
                  availableSizes.length === 0
                    ? language.sizeInfoText
                    : undefined
                }
                groupTitle={{
                  title: language.sizes,
                  id: 'choose-product-sizes',
                  errorText: language[errors.sizes],
                }}
              />
            </FormCard>
            <FormCard legendText={language.pricing}>
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
                  min={5}
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
                  max={maxDiscount}
                  min={minDiscount}
                  inputMode="numeric"
                  errorText={language[errors.discount]}
                  onBlur={onBlur}
                />
              </div>
              <div className="product-form-2-columns">
                <ToggleSwitch
                  id="show-price"
                  name="show-price"
                  checked={showPrice}
                  onChange={handleShowPrice}
                  labelText={language.showPrice}
                />
                {showPrice && (
                  <ProductPrice
                    price={values.price}
                    discount={values.discount}
                    hasError={errors.discount}
                  />
                )}
              </div>
            </FormCard>
            <FormCard legendText={language.details}>
              <StatusInputsNew
                labelText={language.productStatus}
                ref={formRef}
                onSelectDate={handleDaySelect}
                selectedDate={selectedDate}
                timeValue={timeValue}
                onTimeChange={handleTimeChange}
                onSelectStatus={onSelectChange}
                value={values.productStatus}
                name="productStatus"
                id="productStatus"
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
              </div>
              {selectedProduct && (
                <LabelValueGrid text={language.productsInStock}>
                  {selectedProduct.countInStock} {language.pcs}
                </LabelValueGrid>
              )}
            </FormCard>
          </article>
        </section>
      </Form>
    </ErrorBoundary>
  );
};

export default SelectField;
