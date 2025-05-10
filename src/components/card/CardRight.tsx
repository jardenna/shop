import useLanguage from '../../features/language/useLanguage';
import LinkButton from '../LinkButton';
import CardContent from './CardContent';
import CardDate from './CardDate';

type CardRightProps = {
  createdAt: Date;
  heading: string;
  linkTo: string;
  name: string;
  showStatusMessage: boolean;
  statusMessage: string;
};

const CardRight = ({
  createdAt,
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
        <div>
          <h3>{statusMessage}</h3>
          {name} {language.notVisibleInShop}.
          <LinkButton linkTo={linkTo} linkText={language.publish} />
        </div>
      )}
      <CardDate text={language.createdAt} date={createdAt} />
    </CardContent>
  );
};

export default CardRight;
