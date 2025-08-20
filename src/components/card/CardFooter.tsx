import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { BtnVariant, SizeVariant } from '../../types/enums';
import LinkButton from '../LinkButton';
import type {
  PrimaryActionBtnProps,
  SecondaryActionBtnProps,
} from '../modal/Modal';
import ModalContainer from '../modal/ModalContainer';

type CardFooterProps = {
  id: string;
  linkTo: string;
  modalHeaderText: string;
  name: string;
  primaryActionBtn: PrimaryActionBtnProps;
  allowedToDelete?: boolean;
  triggerModalDisabled?: boolean;
};

const CardFooter = ({
  id,
  linkTo,
  name,
  primaryActionBtn,
  modalHeaderText,
  allowedToDelete,
  triggerModalDisabled,
}: CardFooterProps) => {
  const { language } = useLanguage();
  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };

  return (
    <LayoutElement as="footer" className="footer" ariaLabel="card">
      {allowedToDelete && (
        <ModalContainer
          triggerModalBtnContent={language.delete}
          triggerModalBtnVariant={BtnVariant.Danger}
          id={id}
          primaryActionBtn={primaryActionBtn}
          secondaryActionBtn={secondaryActionBtn}
          modalSize={SizeVariant.Sm}
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
