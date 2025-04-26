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
};

const CardFooter = ({
  id,
  linkTo,
  name,
  primaryActionBtn,
  modalHeaderText,
  scheduledDate,
}: CardFooterProps) => {
  const { language } = useLanguage();
  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };
  return (
    <div>
      {scheduledDate && (
        <CardDate
          name={name}
          text={language.scheduledToBePubliched}
          date={scheduledDate}
        />
      )}
      <LayoutElement className="footer" ariaLabel="card">
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
        <LinkButton linkTo={linkTo} linkText={language.edit} />
      </LayoutElement>
    </div>
  );
};

export default CardFooter;
