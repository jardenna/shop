import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { BtnVariant } from '../../types/enums';
import LinkButton from '../LinkButton';
import type { PrimaryActionBtnProps } from '../modal/Modal';
import ModalContainer from '../modal/ModalContainer';

type CardFooterProps = {
  id: string;
  linkTo: string;
  modalHeaderText: string;
  name: string;
  primaryActionBtn: PrimaryActionBtnProps;
  triggerModalDisabled?: boolean;
};

const CardFooter = ({
  id,
  linkTo,
  name,
  primaryActionBtn,
  modalHeaderText,
  triggerModalDisabled,
}: CardFooterProps) => {
  const { language } = useLanguage();
  const { isAdmin } = useAuth();

  return (
    <LayoutElement
      as="footer"
      className="footer"
      ariaLabel={language.productCard}
    >
      {isAdmin && (
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
      )}
      <LinkButton
        linkTo={linkTo}
        linkText={language.update}
        variant={BtnVariant.Primary}
      />
    </LayoutElement>
  );
};

export default CardFooter;
