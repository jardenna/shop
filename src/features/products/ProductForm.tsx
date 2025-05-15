/* eslint-disable no-underscore-dangle */
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Product,
  ProductRequest,
  SubCategoriesWithParent,
} from '../../app/api/apiTypes';
import useDatePicker from '../../components/datePicker/useDatePicker';
import Form from '../../components/Form';
import Checkbox from '../../components/formElements/Checkbox';
import FileInput from '../../components/formElements/fileInput/FileInput';
import ProductImgList from '../../components/formElements/fileInput/ProductImgList';
import Input from '../../components/formElements/Input';
import Textarea from '../../components/formElements/Textarea';
import ToggleSwitch from '../../components/formElements/ToggleSwitch';
import validateProduct from '../../components/formElements/validation/validateProduct';
import GridTwoCol from '../../components/GridTwoCol';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import ColorOptions from '../../components/selectbox/ColorOptions';
import Selectbox from '../../components/selectbox/Selectbox';
import StatusOptions from '../../components/selectbox/StatusOptions';
import StatusInputs from '../../components/StatusInputs';
import useFormValidation from '../../hooks/useFormValidation';
import { MainPath } from '../../layout/nav/enums';
import variables from '../../scss/variables.module.scss';
import { OptionType } from '../../types/types';
import {
  discountCalculation,
  getlowerCaseFirstLetter,
  sizeList,
} from '../../utils/utils';
import ProductPrice from '../currency/components/ProductPrice';
import useCurrency from '../currency/useCurrency';
import useLanguage from '../language/useLanguage';
import { useUploadImageMutation } from '../uploadImageApiSlice';
import FormCard from './FormCard';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from './productApiSlice';

type ProductFormProps = {
  id: string | null;
  parentCategories: SubCategoriesWithParent[];
  selectedProduct: Product | null;
  onReset: () => void;
};

const ProductForm = ({
  id,
  selectedProduct,
  parentCategories,
  onReset,
}: ProductFormProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const formRef = useRef<HTMLFormElement | null>(null);

  // Options and initial state
  const parentCategoryOptions = parentCategories.map(
    ({ label, parentCategoryName, value, categoryStatus }) => ({
      label: `${parentCategoryName} / ${label}`,
      value,
      status: categoryStatus,
    }),
  );

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

  const checkboxItems = [
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
  ];

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
    sizes: selectedProduct?.sizes ?? sizeList,
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

  const [showPrice, setShowPrice] = useState(false);
  // const [images, setImages] = useState<string[]>(selectedProduct?.images || []);

  const [disabledImages, setDisabledImages] = useState<string[]>([]);

  // Helper functions
  const handleGoback = () => {
    navigate(-1);
  };

  const toggleImage = (img: string) => {
    setDisabledImages((prev) =>
      prev.includes(img)
        ? prev.filter((i: string) => i !== img)
        : [...prev, img],
    );
  };

  const uploadedImg = selectedProduct?.images || [];

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

  const handleSelectCategory = (name: string, selectedOptions: OptionType) => {
    onCustomChange(name, selectedOptions.value);
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
      onCancel={handleGoback}
    >
      <div className="flex align-items-start">
        <div className="flex-2">
          <FormCard legendText={language.productImages} onReset={onReset}>
            {id && (
              <ul className="preview-list uploaded-img">
                {selectedProduct?.images.map((img, index) => (
                  <ProductImgList
                    key={index}
                    onClick={() => {
                      toggleImage(img);
                    }}
                    isImgDisabled={disabledImages.includes(img)}
                    img={img}
                    ariaLabel={`${language.delete} ${language.image}`}
                    title={language.trash}
                  />
                ))}
              </ul>
            )}
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
          </FormCard>
          <FormCard legendText={language.productInformation} onReset={onReset}>
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
          </FormCard>
          <FormCard legendText={language.productQuantity} onReset={onReset}>
            <Input
              value={values.quantity || ''}
              type="number"
              id="quantity"
              name="quantity"
              labelText={language.addToStock}
              onChange={onChange}
            />
            {selectedProduct && (
              <span>
                <strong>{language.productsInStockNow}: </strong>
                {selectedProduct.countInStock}
              </span>
            )}
          </FormCard>
        </div>
        <div className="flex-1">
          <FormCard legendText={language.productVariants} onReset={onReset}>
            <div>
              <span className="form-span-container">
                {language.sizes}
                <span className="error-message">{language[errors.sizes]}</span>
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
                inputInfo={currencyText}
              />
              <Input
                type="number"
                value={values.discount || ''}
                id="discount"
                name="discount"
                labelText={language.discount}
                onChange={onChange}
                inputInfo="%"
              />
            </div>

            <GridTwoCol>
              <ToggleSwitch
                id="show-price"
                checked={showPrice}
                onChange={handleShowPrice}
                labelText="showPrice"
              />

              {showPrice &&
                (values.discount ? (
                  <ProductPrice
                    price={discountCalculation(values.price, values.discount)}
                  />
                ) : (
                  <ProductPrice price={values.price} />
                ))}
            </GridTwoCol>
          </FormCard>
          <FormCard legendText={language.details} onReset={onReset}>
            <div className="flex">
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
              />
            </div>
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
          </FormCard>
        </div>
      </div>
    </Form>
  );
};

export default ProductForm;
