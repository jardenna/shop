import { Size } from '../../../../app/api/apiTypes/sharedApiTypes';
import { BaseProductFormData } from '../../../../app/api/apiTypes/shopApiTypes';
import FieldSet from '../../../../components/fieldset/FieldSet';
import Form from '../../../../components/Form';
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

export type InitialShopValues = {
  color: string;
  qty: number;
  size: Size | '';
};

interface CartFormProps {
  currentProductQuantity: number;
  displaySizeList: Size[];
  isLoading: boolean;
  productData: BaseProductFormData;
  showQuantity?: boolean;
  handleSubmit: (values: InitialShopValues) => void;
}

const CartForm = ({
  productData,
  displaySizeList,
  currentProductQuantity,
  handleSubmit,
  isLoading,
  showQuantity,
}: CartFormProps) => {
  const { language } = useLanguage();

  const { sizes, colors, categoryName } = productData;
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
    <Form
      onSubmit={onSubmit}
      submitBtnLabel={language.addToBag}
      isLoading={isLoading}
    >
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
        {showQuantity && productData.countInStock && (
          <NumberStep
            onChange={onChange}
            onNumberStepChange={onNumberStepChange}
            value={values.qty}
            min={1}
            max={productData.countInStock}
            labelText={language.quantity}
            id="qty"
            name="qty"
            showLabel
            disabled={
              currentProductQuantity + values.qty >= productData.countInStock
            }
          />
        )}
      </FieldSet>
    </Form>
  );
};

export default CartForm;
