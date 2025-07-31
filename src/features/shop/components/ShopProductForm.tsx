import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import FieldSet from '../../../components/fieldset/FieldSet';
import Form from '../../../components/form/Form';
import { PrimaryActionBtnProps } from '../../../components/modal/Modal';
import ModalContainer from '../../../components/modal/ModalContainer';
import ColorListSingleChoice from '../../../components/productColorLists/ColorListSingleChoice';
import SizeListSingleChoice from '../../../components/productLists/SizeListSingleChoice';
import useFormValidation from '../../../hooks/useFormValidation';
import { BtnVariant, SizeVariant } from '../../../types/enums';
import { ColorOption } from '../../../utils/colorUtils';
import { getDisplaySizes } from '../../../utils/sizeUtils';
import useLanguage from '../../language/useLanguage';
import NotiFyMe from './NotiFyMe';

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

  const title =
    values.size === ''
      ? language.selectSize
      : `${language.selectedSize}: ${values.size}`;

  const primaryActionBtn: PrimaryActionBtnProps = {
    onClick: () => {
      console.log(12);
    },
    label: language.notiftyMe,
    variant: BtnVariant.Primary,
  };

  const displaySizeList = getDisplaySizes({
    mainKey: selectedProduct.categoryName,
    subKey: selectedProduct.subCategoryName,
    availableSizes: selectedProduct.sizes,
  });

  const missingSizes = displaySizeList.filter(
    (size) => !selectedProduct.sizes.includes(size),
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
        <SizeListSingleChoice
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
      <div>
        <ModalContainer
          triggerModalBtnContent="Notify me when missing sizes are back in stock"
          triggerModalBtnVariant={BtnVariant.Ghost}
          id={selectedProduct.productName}
          primaryActionBtn={primaryActionBtn}
          modalSize={SizeVariant.Sm}
          modalHeaderText={`${language.size}   ${language.currentlyUnavailable}`}
        >
          <NotiFyMe sizeList={missingSizes} />
        </ModalContainer>
      </div>
    </Form>
  );
};

export default ShopProductForm;
