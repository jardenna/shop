import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant, SizeVariant } from '../../types/enums';
import LinkButton from '../LinkButton';
import { PrimaryActionBtnProps, SecondaryActionBtnProps } from '../modal/Modal';
import ModalContainer from '../modal/ModalContainer';
import CategoryDate from './CategoryDate';

type CategoryCardFooterProps = {
  id: string;
  linkTo: MainPath | string;
  modalHeaderText: string;
  name: string;
  primaryActionBtn: PrimaryActionBtnProps;
  scheduledDate?: Date;
};

const CategoryCardFooter = ({
  id,
  linkTo,
  name,
  primaryActionBtn,
  modalHeaderText,
  scheduledDate,
}: CategoryCardFooterProps) => {
  const { language } = useLanguage();
  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };
  return (
    <div>
      {scheduledDate && (
        <CategoryDate
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

export default CategoryCardFooter;
