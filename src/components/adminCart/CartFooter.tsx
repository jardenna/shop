import { useLanguage } from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import LinkButton from '../LinkButton';
import type { PrimaryActionBtnProps } from '../modal/Modal';
import ModalContainer from '../modal/ModalContainer';

type CartFooterProps = {
  id: string;
  linkTo: string;
  modalHeaderText: string;
  name: string;
  primaryActionBtn: PrimaryActionBtnProps;
  triggerModalDisabled?: boolean;
};

const CartFooter = ({
  id,
  linkTo,
  name,
  primaryActionBtn,
  modalHeaderText,
  triggerModalDisabled,
}: CartFooterProps) => {
  const { language } = useLanguage();

  return (
    <footer className="footer">
      <ModalContainer
        triggerModalBtnContent={language.delete}
        triggerModalBtnVariant={BtnVariant.Danger}
        id={id}
        primaryActionBtn={primaryActionBtn}
        modalHeaderText={modalHeaderText}
        triggerModalDisabled={triggerModalDisabled}
      >
        {language.sureToDelete} {name}
      </ModalContainer>

      <LinkButton
        linkTo={linkTo}
        linkText={language.update}
        variant={BtnVariant.Primary}
      />
    </footer>
  );
};

export default CartFooter;
