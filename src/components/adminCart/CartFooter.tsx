import { useLanguage } from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import LinkButton from '../LinkButton';
import DeleteModal from '../Modal/DeleteModal';
import TriggerModalButton from '../Modal/TriggerModalButton';

interface CartFooterProps {
  id: string;
  isLoading: boolean;
  linkTo: string;
  modalHeaderText: string;
  name: string;
  onDelete: () => void;
}

const CartFooter = ({
  id,
  name,
  isLoading,
  modalHeaderText,
  linkTo,
  onDelete,
}: CartFooterProps) => {
  const { language } = useLanguage();
  return (
    <footer className="footer">
      <TriggerModalButton
        ariaControls="delete-product"
        modalId="delete-product"
        variant={BtnVariant.Danger}
      >
        {language.delete}
      </TriggerModalButton>

      <DeleteModal
        isLoading={isLoading}
        modalId="delete-product"
        headerText={modalHeaderText}
        ariaControls="ariaControls"
        onDelete={onDelete}
        modalMessage={name}
        itemId={id}
      />
      <LinkButton
        linkTo={linkTo}
        linkText={language.update}
        variant={BtnVariant.Primary}
      />
    </footer>
  );
};

export default CartFooter;
