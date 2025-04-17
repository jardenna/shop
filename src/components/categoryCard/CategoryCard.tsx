import { CategoryStatus } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import DateDisplay from '../datePicker/DateDisplay';
import Icon from '../icons/Icon';
import './_category-card.scss';

type CategoryCardProps = {
  categoryStatus: CategoryStatus;
  createdAt: Date;
  mainCategoryName: string;
  showStatusMessage: boolean;
  statusMessage: string;
  subCategoryName: string;
  totalProducts: number;
};

const CategoryCard = ({
  subCategoryName,
  totalProducts,
  createdAt,
  mainCategoryName,
  showStatusMessage,
  statusMessage,
  categoryStatus,
}: CategoryCardProps) => {
  const { language } = useLanguage();
  return (
    <div className="category-card-container">
      <section className="category-card card-left">
        <span className="card-top-line" />
        <div className="category-card-content">
          <h2>{subCategoryName}</h2>
          <span>{language.totalProducts}:</span>
          <span>{totalProducts}</span>
          <span className={`badge ${categoryStatus.toLowerCase()}`}>
            {language[categoryStatus.toLocaleLowerCase()]}
          </span>
          {showStatusMessage && (
            <div>
              <Icon iconName={IconName.Warning} title="ll" size="30" />

              <span>{language.categoryIsCurrently}</span>
              <span>{language[statusMessage]}</span>
              <span>{language.categoryWillNotBeVisible}</span>
            </div>
          )}
        </div>
      </section>
      <section className="category-card card-right">
        <span className="card-top-line" />
        <div className="category-card-content">
          <h2>{mainCategoryName}</h2>
          <span>
            {language.createdAt} <DateDisplay date={createdAt} />
          </span>
        </div>
      </section>
    </div>
  );
};
export default CategoryCard;
