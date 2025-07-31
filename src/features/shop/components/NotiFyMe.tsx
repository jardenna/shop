import { PrimaryActionBtnProps } from '../../../components/modal/Modal';
import ModalContainer from '../../../components/modal/ModalContainer';
import { BtnVariant, SizeVariant } from '../../../types/enums';
import useLanguage from '../../language/useLanguage';

type NotifiMeProps = {
  name?: string;
};
const NotiFyMe = ({ name }: NotifiMeProps) => {
  const { language } = useLanguage();

  // const missingSizes = displaySizeList.filter(
  //   (size) => !selectedProduct.sizes.includes(size),
  // );

  // const initialState = {
  //   sizes: [],
  //   email: '',
  // };

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
        <p>{language.getNotifiedForProducts}</p>
        <div>size multiChoise list</div>
        {name && name}
        <div>email form</div>
      </ModalContainer>
    </div>
  );
};

export default NotiFyMe;
