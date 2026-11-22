import { useLocation } from 'react-router';
import { useLanguage } from '../../features/language/useLanguage';
import LinkButton from '../LinkButton';
import DeleteModal from '../Modal/DeleteModal';
import TriggerModalButton from '../Modal/TriggerModalButton';

interface CartFooterProps {
  id: string;
  isLoading: boolean;
  linkTo: string;
  modalHeaderText: string;
  name: string;
  hideDeleteBtn?: boolean;
  onDelete: () => void;
}

const CartFooter = ({
  id,
  name,
  isLoading,
  modalHeaderText,
  linkTo,
  onDelete,
  hideDeleteBtn,
}: CartFooterProps) => {
  const { language } = useLanguage();
  const location = useLocation();

  const returnTo =
    location.state?.returnTo ?? `${location.pathname}${location.search}`;

  return (
    <footer className="footer">
      {!hideDeleteBtn && (
        <>
          <TriggerModalButton
            ariaControls="delete-product"
            modalId="delete-product"
            variant="danger"
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
        </>
      )}

      <LinkButton
        linkTo={linkTo}
        state={{ returnTo }}
        linkText={language.update}
        variant="primary"
      />
    </footer>
  );
};

export default CartFooter;
