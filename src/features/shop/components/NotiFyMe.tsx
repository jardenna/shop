import { BaseProduct, Size } from '../../../app/api/apiTypes/sharedApiTypes';
import { PrimaryActionBtnProps } from '../../../components/modal/Modal';
import ModalContainer from '../../../components/modal/ModalContainer';
import SizeListMultiChoice from '../../../components/productLists/SizeListMultiChoice';
import useFormValidation from '../../../hooks/useFormValidation';
import { BtnVariant, SizeVariant } from '../../../types/enums';
import { checkBoxSizeList } from '../../../utils/sizeUtils';
import useLanguage from '../../language/useLanguage';

type NotifiMeProps = {
  displaySizeList: Size[];
  selectedProduct: BaseProduct;
};
const NotiFyMe = ({ selectedProduct, displaySizeList }: NotifiMeProps) => {
  const { language } = useLanguage();

  const missingSizes = displaySizeList.filter(
    (size) => !selectedProduct.sizes.includes(size),
  );

  const initialState = {
    sizes: [],
    email: '',
  };

  const { onChange, values } = useFormValidation({
    initialState,
    callback: () => {
      console.log(values);
    },
  });

  const availableSizeList = checkBoxSizeList(missingSizes);
  const primaryActionBtn: PrimaryActionBtnProps = {
    onClick: () => {
      console.log(12);
    },
    label: language.notiftyMe,
    variant: BtnVariant.Primary,
  };

  return (
    <div>
      <ModalContainer
        triggerModalBtnContent="Notify me when missing sizes are back in stock"
        triggerModalBtnVariant={BtnVariant.Ghost}
        id="hh"
        primaryActionBtn={primaryActionBtn}
        modalSize={SizeVariant.Sm}
        modalHeaderText={`${language.size}   ${language.currentlyUnavailable}`}
      >
        <SizeListMultiChoice
          onChange={onChange}
          values={values.sizes}
          availableSizeList={availableSizeList}
          name="sizes"
          required
          groupTitle={{
            title: language.sizes,
            id: 'choose-product-colors',
          }}
        />
        <p>{language.getNotifiedForProducts}</p>
        <div>size multiChoise list</div>

        <div>email form</div>
      </ModalContainer>
    </div>
  );
};

export default NotiFyMe;
