import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import LinkButton from '../LinkButton';
import CardContent from './CardContent';
import CardDate from './CardDate';

type CardRightProps = {
  createdAt: Date;
  heading: string;
  linkTo: MainPath | string;
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
          <div className="category-card-text">
            <h3>{statusMessage}</h3>
            {name} {language.notVisibleInShop}.
          </div>
          <div>
            <LinkButton linkTo={linkTo} linkText={language.publish} />
          </div>
        </div>
      )}
      <CardDate text={language.createdAt} date={createdAt} />
    </CardContent>
  );
};

export default CardRight;
