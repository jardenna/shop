import { BaseProduct, Size } from '../../../app/api/apiTypes/sharedApiTypes';
import FieldSet from '../../../components/fieldset/FieldSet';
import Form from '../../../components/form/Form';
import RadioBtnList from '../../../components/formElements/checkbox/RadioBtnList';
import ColorListSingleChoice from '../../../components/productColorLists/ColorListSingleChoice';
import useFormValidation from '../../../hooks/useFormValidation';
import { ColorOption } from '../../../utils/colorUtils';
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

        <RadioBtnList
          initialChecked={values.size}
          availableSizeList={selectedProduct.sizes}
          onChange={onChange}
          displaySizeList={displaySizeList}
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
