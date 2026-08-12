import { useLanguage } from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import LinkButton from '../LinkButton';
import CartContent from './CartContent';

type CartRightProps = {
  heading: string;
  linkTo: string;
  name: string;
  showStatusMessage: boolean;
  statusMessage: string;
  onReset: () => void;
};

const CartRight = ({
  linkTo,
  heading,
  name,
  showStatusMessage,
  statusMessage,
  onReset,
}: CartRightProps) => {
  const { language } = useLanguage();

  return (
    <CartContent className="right" heading={heading} onReset={onReset}>
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
            variant={BtnVariant.Primary}
          />
        </>
      )}
    </CartContent>
  );
};

export default CartRight;
