import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import FieldSet from '../../../components/fieldset/FieldSet';
import Form from '../../../components/form/Form';
import ColorListSingleChoice from '../../../components/productColorLists/ColorListSingleChoice';
import SizeListSingleChoice from '../../../components/productLists/SizeListSingleChoice';
import useFormValidation from '../../../hooks/useFormValidation';
import { ColorOption } from '../../../utils/colorUtils';
import useLanguage from '../../language/useLanguage';

type ShopProductFormProps = {
  colorList: ColorOption[];
  selectedProduct: BaseProduct;
};

const ShopProductForm = ({
  selectedProduct,
  colorList,
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
        <SizeListSingleChoice
          initialChecked={values.size}
          availableSizeList={selectedProduct.sizes}
          categoryName={selectedProduct.categoryName}
          subCategoryName={selectedProduct.subCategoryName}
          onChange={onChange}
          name="size"
          groupTitle={{
            title: language.selectSize,
            id: 'choose-product-size',
          }}
        />
      </FieldSet>
    </Form>
  );
};

export default ShopProductForm;
