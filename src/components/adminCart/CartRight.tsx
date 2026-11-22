import { useLanguage } from '../../features/language/useLanguage';
import LinkButton from '../LinkButton';
import CartContent from './CartContent';

type CartRightProps = {
  heading: string;
  linkTo: string;
  name: string;
  showStatusMessage: boolean;
  statusMessage: string;
};

const CartRight = ({
  linkTo,
  heading,
  name,
  showStatusMessage,
  statusMessage,
}: CartRightProps) => {
  const { language } = useLanguage();

  return (
    <CartContent className="right" heading={heading}>
      {showStatusMessage && (
        <>
          <div>
            <p className="status-message-title">{statusMessage}</p>
            <p>
              {name} {language.notVisibleInShop}.
            </p>
          </div>
          <LinkButton
            linkTo={linkTo}
            linkText={language.publish}
            variant="primary"
          />
        </>
      )}
    </CartContent>
  );
};

export default CartRight;
