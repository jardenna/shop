import { ShopProductResponse } from '../app/api/apiTypes/shopApiTypes';
import Form from '../components/form/Form';
import ColorListSingleChoice from '../components/productColorLists/ColorListSingleChoice';
import SizeListSingleChoice from '../components/productLists/SizeListSingleChoice';
import useLanguage from '../features/language/useLanguage';
import useFormValidation from '../hooks/useFormValidation';
import { ColorOption } from '../utils/colorUtils';

type ShopProductFormProps = {
  colorList: ColorOption[];
  selectedProduct: ShopProductResponse;
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
      <SizeListSingleChoice
        sizeList={selectedProduct.sizes}
        initialChecked={values.size}
        onChange={onChange}
        name="size"
        groupTitle={{
          title: language.selectSize,
          id: 'choose-product-size',
        }}
      />
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
    </Form>
  );
};

export default ShopProductForm;
