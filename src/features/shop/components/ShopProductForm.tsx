import { BaseProduct, Size } from '../../../app/api/apiTypes/sharedApiTypes';
import FieldSet from '../../../components/fieldset/FieldSet';
import Form from '../../../components/form/Form';
import RadioControls from '../../../components/formElements/controlGroup/RadioControls';
import ColorListSingleChoice from '../../../components/productColorLists/ColorListSingleChoice';
import useFormValidation from '../../../hooks/useFormValidation';
import { ColorOption } from '../../../utils/colorUtils';
import resolveIconName from '../../../utils/iconHelpers';
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

  const title =
    values.size === ''
      ? language.selectSize
      : `${language.selectedSize}: ${values.size}`;

  const sortedColorList = [...selectedProduct.colors].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase()),
  );

  return (
    <Form onSubmit={onSubmit} submitBtnLabel={language.create}>
      <FieldSet legendText={language.productVariants} hideLegendText>
        <ColorListSingleChoice
          colorList={colorList}
          initialChecked={values.color}
          onChange={onChange}
          name="color"
          iconName={selectedProduct.categoryName}
          groupTitle={{
            title: language.selectColor,
            id: 'choose-product-color',
          }}
        />

        <RadioControls
          initialChecked={values.color}
          onChange={onChange}
          options={sortedColorList}
          name="color"
          icon={resolveIconName(selectedProduct.categoryName)}
          groupTitle={{
            title: language.selectColor,
            id: 'choose-product-color',
          }}
        />

        <RadioControls
          initialChecked={values.size}
          disabledList={selectedProduct.sizes}
          onChange={onChange}
          options={displaySizeList}
          name="size"
          groupTitle={{
            title,
            id: 'choose-product-size',
          }}
        />
      </FieldSet>
    </Form>
  );
};

export default ShopProductForm;
