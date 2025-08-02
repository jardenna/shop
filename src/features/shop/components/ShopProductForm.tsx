import { BaseProduct, Size } from '../../../app/api/apiTypes/sharedApiTypes';
import FieldSet from '../../../components/fieldset/FieldSet';
import Form from '../../../components/form/Form';
import RadioControls from '../../../components/formElements/controlGroup/RadioControls';
import useFormValidation from '../../../hooks/useFormValidation';
import {
  ColorOption,
  sortColorsByTranslation,
} from '../../../utils/colorUtils';
import resolveIconName from '../../../utils/iconHelpers';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import useLanguage from '../../language/useLanguage';

type ShopProductFormProps = {
  colorList: ColorOption[];
  displaySizeList: Size[];
  selectedProduct: BaseProduct;
};

const ShopProductForm = ({
  selectedProduct,
  colorList,
  displaySizeList,
}: ShopProductFormProps) => {
  const { language } = useLanguage();

  const initialState = {
    color: colorList[0].value,
    size: '',
  };

  const { onChange, values, onSubmit } = useFormValidation({
    initialState,
    callback: () => {
      console.log(values);
    },
  });

  const titleSize =
    values.size === ''
      ? language.selectSize
      : `${language.selectedSize}: ${values.size}`;

  const titleColor =
    values.color === ''
      ? language.selectColor
      : `${language.selectedSize}: ${getlowerCaseFirstLetter(values.color, language)}`;

  const sortedTranslatedColors = sortColorsByTranslation(
    selectedProduct.colors,
    language,
  );

  return (
    <Form onSubmit={onSubmit} submitBtnLabel={language.create}>
      <FieldSet legendText={language.productVariants} hideLegendText>
        <RadioControls
          initialChecked={values.color}
          className="with-icon"
          required={values.color === ''}
          onChange={onChange}
          options={sortedTranslatedColors}
          name="color"
          iconName={resolveIconName(selectedProduct.categoryName)}
          groupTitle={{
            title: titleColor,
            id: 'choose-product-color',
          }}
        />

        <RadioControls
          initialChecked={values.size}
          required={values.size === ''}
          disabledList={selectedProduct.sizes}
          className="size-list"
          onChange={onChange}
          options={displaySizeList}
          name="size"
          groupTitle={{
            title: titleSize,
            id: 'choose-product-size',
          }}
        />
      </FieldSet>
    </Form>
  );
};

export default ShopProductForm;
