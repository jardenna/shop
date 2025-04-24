import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import LinkButton from '../LinkButton';
import CategoryCardContent from './CategoryCardContent';
import CategoryDate from './CategoryDate';

type CategoryCardRightProps = {
  createdAt: Date;
  heading: string;
  linkTo: MainPath | string;
  name: string;
  showStatusMessage: boolean;
  statusMessage: string;
};

const CategoryCardRight = ({
  createdAt,
  linkTo,
  heading,
  name,
  showStatusMessage,
  statusMessage,
}: CategoryCardRightProps) => {
  const { language } = useLanguage();

  return (
    <CategoryCardContent className="right" heading={heading}>
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
      <CategoryDate text={language.createdAt} date={createdAt} />
    </CategoryCardContent>
  );
};

export default CategoryCardRight;
