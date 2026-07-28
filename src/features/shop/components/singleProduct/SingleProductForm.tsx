import { Size } from '../../../../app/api/apiTypes/sharedApiTypes';
import { ProductFormData } from '../../../../app/api/apiTypes/shopApiTypes';
import FieldSet from '../../../../components/fieldset/FieldSet';
import Form from '../../../../components/form/Form';
import ControlGroupList from '../../../../components/formElements/controlGroup/ControlGroupList';
import NumberStep from '../../../../components/formElements/numberStep/NumberStep';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import {
  getColorOptions,
  sortColorsByTranslation,
} from '../../../../utils/colorUtils';
import { resolveIconName } from '../../../../utils/iconHelpers';
import { oneSize } from '../../../../utils/sizeUtils';
import { translateKey } from '../../../../utils/utils';
import { validateShopProduct } from '../../../../utils/validation/validateShopProduct';
import { useLanguage } from '../../../language/useLanguage';

interface SingleProductFormProps {
  currentProductQuantity: number;
  displaySizeList: Size[];
  productData: ProductFormData;
  handleSubmit: (values: InitialShopValues) => void;
}

export type InitialShopValues = {
  color: string;
  qty: number;
  size: Size | '';
};

const SingleProductForm = ({
  productData,
  displaySizeList,
  currentProductQuantity,
  handleSubmit,
}: SingleProductFormProps) => {
  const { language } = useLanguage();

  const { sizes, colors, categoryName, countInStock } = productData;
  const colorList = getColorOptions({ colors, language });

  const initialState: InitialShopValues = {
    color: colorList[0].value,
    size: sizes.length === 1 ? oneSize : '',
    qty: 1,
  };

  const { onChange, onNumberStepChange, values, onSubmit, errors } =
    useFormValidation({
      initialState,
      callback: submitCart,
      validate: validateShopProduct,
    });

  function submitCart() {
    handleSubmit(values);
  }

  const sortedTranslatedColors = sortColorsByTranslation(colors, language);

  const titleSize =
    values.size === ''
      ? language.selectSize
      : `${language.selectedSize}: ${values.size}`;

  const titleColor =
    values.color === ''
      ? language.selectedColor
      : `${language.selectedColor}: ${translateKey(values.color, language)}`;

  return (
    <Form onSubmit={onSubmit} submitBtnLabel={language.addToBag}>
      <FieldSet legendText={language.productVariants}>
        <ControlGroupList
          classType="secondary"
          initialChecked={values.color}
          type="radio"
          className="color-list"
          required={values.color === ''}
          onChange={onChange}
          options={sortedTranslatedColors}
          name="color"
          variant="large"
          iconSize="5em"
          iconName={resolveIconName(categoryName)}
          groupTitle={{
            title: titleColor,
            id: 'choose-product-color',
            errorText: language[errors.color],
          }}
        />
        <ControlGroupList
          classType="secondary"
          type="radio"
          initialChecked={values.size}
          required={values.size === ''}
          disabledList={sizes}
          onChange={onChange}
          options={displaySizeList}
          name="size"
          groupTitle={{
            title: titleSize,
            id: 'choose-product-size',
            errorText: language[errors.size],
          }}
        />
        <NumberStep
          onChange={onChange}
          onNumberStepChange={onNumberStepChange}
          value={values.qty}
          min={1}
          max={countInStock}
          labelText={language.quantity}
          id="qty"
          name="qty"
          showLabel
          disabled={currentProductQuantity + values.qty >= countInStock}
        />
      </FieldSet>
    </Form>
  );
};

export default SingleProductForm;
