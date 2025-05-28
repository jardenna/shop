import useLanguage from '../../features/language/useLanguage';
import LinkButton from '../LinkButton';
import CardContent from './CardContent';

type CardRightProps = {
  heading: string;
  linkTo: string;
  name: string;
  showStatusMessage: boolean;
  statusMessage: string;
  onReset: () => void;
};

const CardRight = ({
  linkTo,
  heading,
  name,
  showStatusMessage,
  statusMessage,
  onReset,
}: CardRightProps) => {
  const { language } = useLanguage();

  return (
    <CardContent className="right" heading={heading} onReset={onReset}>
      {showStatusMessage && (
        <>
          <div>
            <h3>{statusMessage}</h3>
            <p>
              {name} {language.notVisibleInShop}.
            </p>
          </div>
          <LinkButton linkTo={linkTo} linkText={language.publish} />
        </>
      )}
    </CardContent>
  );
};

export default CardRight;
