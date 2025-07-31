import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import FieldSet from '../../../components/fieldset/FieldSet';
import Form from '../../../components/form/Form';
import { PrimaryActionBtnProps } from '../../../components/modal/Modal';
import { TriggerModalProps } from '../../../components/modal/ModalContainer';
import ColorListSingleChoice from '../../../components/productColorLists/ColorListSingleChoice';
import SizeListSingleChoice from '../../../components/productLists/SizeListSingleChoice';
import useFormValidation from '../../../hooks/useFormValidation';
import { BtnVariant } from '../../../types/enums';
import { ColorOption } from '../../../utils/colorUtils';
import useLanguage from '../../language/useLanguage';

export type ModalContainerProps = TriggerModalProps & {
  modalHeaderText: string;
};

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

  const triggerModal: ModalContainerProps = {
    triggerModalBtnContent: 'Notify me when missing sizes are back in stock',
    triggerModalBtnVariant: BtnVariant.Ghost,
    modalHeaderText: `${language.size}  ${language.currentlyUnavailable}`,
  };

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
          primaryActionBtn={primaryActionBtn}
          triggerModal={triggerModal}
          modalId={selectedProduct.productName}
          initialChecked={values.size}
          availableSizeList={selectedProduct.sizes}
          categoryName={selectedProduct.categoryName}
          subCategoryName={selectedProduct.subCategoryName}
          onChange={onChange}
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
