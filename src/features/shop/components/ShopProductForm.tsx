import type {
  BaseProduct,
  Size,
} from '../../../app/api/apiTypes/sharedApiTypes';
import FieldSet from '../../../components/fieldset/FieldSet';
import Form from '../../../components/form/Form';
import ControlGroupList from '../../../components/formElements/controlGroup/ControlGroupList';
import validateShopProduct from '../../../components/formElements/validation/validateShopProduct';
import useFormValidation from '../../../hooks/useFormValidation';
import {
  ColorOption,
  sortColorsByTranslation,
} from '../../../utils/colorUtils';
import resolveIconName from '../../../utils/iconHelpers';
import { oneSize } from '../../../utils/sizeUtils';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import useLanguage from '../../language/useLanguage';

type ShopProductFormProps = {
  colorList: ColorOption[];
  displaySizeList: Size[];
  selectedProduct: BaseProduct;
};

export type InitialShopValues = {
  color: string;
  size: string;
};

const ShopProductForm = ({
  selectedProduct,
  colorList,
  displaySizeList,
}: ShopProductFormProps) => {
  const { language } = useLanguage();

  const { sizes, categoryName, colors } = selectedProduct;

  const initialState: InitialShopValues = {
    color: colorList[0].value,
    size: sizes.length === 1 ? oneSize : '',
  };

  const { onChange, values, onSubmit, errors } = useFormValidation({
    initialState,
    callback: () => {
      console.log(values);
    },
    validate: validateShopProduct,
  });

  const titleSize =
    values.size === ''
      ? language.selectSize
      : `${language.selectedSize}: ${values.size}`;

  const titleColor =
    values.color === ''
      ? language.selectedColor
      : `${language.selectedColor}: ${getlowerCaseFirstLetter(values.color, language)}`;

  const sortedTranslatedColors = sortColorsByTranslation(colors, language);

  return (
    <Form onSubmit={onSubmit} submitBtnLabel={language.addToBag}>
      <FieldSet legendText={language.productVariants} hideLegendText>
        <ControlGroupList
          initialChecked={values.color}
          type="radio"
          className="color-list"
          required={values.color === ''}
          onChange={onChange}
          options={sortedTranslatedColors}
          name="color"
          variant="large"
          iconSize="70"
          iconName={resolveIconName(categoryName)}
          groupTitle={{
            title: titleColor,
            id: 'choose-product-color',
            errorText: language[errors.colors],
          }}
        />

        <ControlGroupList
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
            errorText: language[errors.sizes],
          }}
        />
      </FieldSet>
    </Form>
  );
};

export default ShopProductForm;
