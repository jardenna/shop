import { useState } from 'react';
import type { Status } from '../../app/api/apiTypes/adminApiTypes';
import type { Product } from '../../app/api/apiTypes/adminProductApiTypes';
import type { Size } from '../../app/api/apiTypes/sharedApiTypes';
import type { SubCategoriesWithParent } from '../../app/api/apiTypes/subCategoryApiTypes';
import { useLanguage } from '../../features/language/useLanguage';
import ImageUpload from '../../features/products/components/ImageUpload';
import { useFormValidation } from '../../hooks/useFormValidation';
import {
  maxDiscount,
  maxFiles,
  minDiscount,
  translateKey,
} from '../../utils/utils';
import { validateProductNew } from '../../utils/validation/validateProductNew';
import FormCard from '../carts/FormCard';
import Form from '../Form';
import Input from '../formElements/Input';
import Textarea from '../formElements/Textarea';
import SelectboxNew from './SelectboxNew';

import { useCurrency } from '../../features/currency/useCurrency';
import ProductPrice from '../../features/shop/components/productPrice/ProductPrice';
import { localStorageKeys, useLocalStorage } from '../../hooks/useLocalStorage';
import ToggleSwitch from '../formElements/toggleSwitch/ToggleSwitch';
import LabelValueGrid from '../labelValueGrid/LabelValueGrid';
import StatusOptionsNew from './StatusOptionsNew';

export interface CategoryProps {
  label: string;
  status: Status;
  value: string;
}

export interface InitialStateValues {
  brand: string;
  colors: string[];
  description: string;
  discount: number;
  images: string[];
  material: string;
  price: number;
  productName: string;
  productStatus: Status;
  quantity: number;
  sizes: Size[];
  subCategory: CategoryProps | null;
  scheduledDate?: Date;
}
interface SelectFieldProps {
  images: string[];
  parentCategories: SubCategoriesWithParent[];
  selectedProduct: Product | null;
  selectedSubCategoryId: string | null;
}

const SelectField = ({
  parentCategories,
  selectedSubCategoryId,
  selectedProduct,
  images,
}: SelectFieldProps) => {
  const { currencyText } = useCurrency();

  const { language } = useLanguage();

  const parentCategoryOptions = parentCategories.map(
    ({ parentCategoryName, categoryId, categoryStatus, translationKey }) => ({
      label: `${language[parentCategoryName.toLowerCase()]} / ${translateKey(translationKey, language)}`,
      value: categoryId,
      status: categoryStatus,
    }),
  );

  const subCategory =
    parentCategoryOptions.find(
      ({ value }) => value === selectedSubCategoryId,
    ) ?? null;

  const initialState: InitialStateValues = {
    subCategory,
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
    onBlur,
  } = useFormValidation({
    initialState,
    validate: validateProductNew,
  });

  const [disabledImages, setDisabledImages] = useState<string[]>([]);
  const [showPrice, setShowPrice] = useLocalStorage(
    localStorageKeys.showPrice,
    false,
  );
  const handleShowPrice = () => {
    setShowPrice(!showPrice);
  };

  const handleToggleImage = (img: string) => {
    setDisabledImages(
      disabledImages.includes(img)
        ? disabledImages.filter((i: string) => i !== img)
        : [...disabledImages, img],
    );
  };
  console.log(values);

  return (
    <Form onSubmit={onSubmit} submitBtnLabel="send">
      <section className="product-form-container">
        <FormCard legendText={language.category}>
          <article className="product-form-right-column">
            <SelectboxNew
              errorText={language[errors.subCategory]}
              name="subCategory"
              labelText={language.category}
              options={parentCategoryOptions}
              value={values.subCategory}
              onChange={onSelectChange}
              id="subCategory"
              isSearchable
              components={{ Option: StatusOptionsNew }}
              required
            />
            <FormCard
              legendText={`${language.productImages} (${language.maximum} ${maxFiles})`}
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
              aa
              {/* <Selectbox
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
              /> */}
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
              {/* <StatusInputs
                labelText={language.productStatus}
                ref={formRef}
                defaultStatusValue={{
                  label: translateKey(values.productStatus, language),
                  value: values.productStatus,
                  id: values.productStatus,
                }}
                onSelectStatus={(selectedOptions: OptionType) => {
                  handleSelectStatus('productStatus', selectedOptions);
                }}
                status={values.productStatus}
                onSelectDate={handleDaySelect}
                selectedDate={selectedDate}
                timeValue={timeValue}
                onTimeChange={handleTimeChange}
              /> */}
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
        </FormCard>
      </section>
    </Form>
  );
};

export default SelectField;
