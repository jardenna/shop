import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import Badge from '../badge/Badge';
import DateDisplay from '../datePicker/DateDisplay';
import Icon from '../icons/Icon';
import './_category-card.scss';

type CategoryCardProps = {
  createdAt: Date;
  mainCategoryName: string;
  scheduledDate: Date | null;
  showStatusMessage: boolean;
  status: string;
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
  scheduledDate,
  statusMessage,
  status,
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
          <Badge
            badgeText={language[status.toLocaleLowerCase()]}
            className={status.toLowerCase()}
          />

          {scheduledDate && (
            <div>
              {language.date}:
              <DateDisplay
                date={scheduledDate}
                hour="2-digit"
                minute="2-digit"
              />
            </div>
          )}
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
