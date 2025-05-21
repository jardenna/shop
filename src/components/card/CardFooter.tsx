import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { BtnVariant, SizeVariant } from '../../types/enums';
import AdminCard from '../adminCard/types';
import LinkButton from '../LinkButton';
import { SecondaryActionBtnProps } from '../modal/Modal';
import ModalContainer from '../modal/ModalContainer';
import CardDate from './CardDate';

type CardFooterProps = AdminCard & {
  modalHeaderText: string;
  allowedDeleteCategory?: boolean;
};

const CardFooter = ({
  id,
  linkTo,
  name,
  primaryActionBtn,
  modalHeaderText,
  scheduledDate,
  allowedDeleteCategory,
}: CardFooterProps) => {
  const { language } = useLanguage();
  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };

  return (
    <>
      {scheduledDate && (
        <CardDate
          name={name}
          text={language.scheduledToBePubliched}
          date={scheduledDate}
        />
      )}
      <LayoutElement className="footer" ariaLabel="card">
        {allowedDeleteCategory && (
          <ModalContainer
            triggerModalBtnContent={language.delete}
            triggerModalBtnVariant={BtnVariant.Danger}
            id={id}
            primaryActionBtn={primaryActionBtn}
            secondaryActionBtn={secondaryActionBtn}
            modalSize={SizeVariant.Sm}
            modalHeaderText={modalHeaderText}
          >
            {language.sureToDelete} {name}
          </ModalContainer>
        )}
        <LinkButton linkTo={linkTo} linkText={language.edit} />
      </LayoutElement>
    </>
  );
};

export default CardFooter;
