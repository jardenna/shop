import { useLanguage } from '../../features/language/useLanguage';
import LinkButton from '../LinkButton';
import CardContent from './CardContent';

interface CardRightProps {
  heading: string;
  linkTo: string;
  name: string;
  showStatusMessage: boolean;
  statusMessage: string;
}

const CardRight = ({
  linkTo,
  heading,
  name,
  showStatusMessage,
  statusMessage,
}: CardRightProps) => {
  const { language } = useLanguage();

  return (
    <CardContent className="right" heading={heading}>
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
    </CardContent>
  );
};

export default CardRight;
