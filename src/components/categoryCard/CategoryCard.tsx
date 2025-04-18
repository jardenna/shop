import useLanguage from '../../features/language/useLanguage';
import Badge from '../badge/Badge';
import Button from '../Button';
import DateDisplay from '../datePicker/DateDisplay';
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
          <Badge
            badgeText={language[status.toLocaleLowerCase()]}
            className={status.toLowerCase()}
          />
          <span>{language.totalProducts}:</span>
          <span>{totalProducts}</span>
          {scheduledDate && (
            <div>
              <span>{subCategoryName} er planlagt til udgivelse den </span>
              <DateDisplay
                date={scheduledDate}
                hour="2-digit"
                minute="2-digit"
              />
            </div>
          )}
        </div>
      </section>
      <section className="category-card card-right">
        <span className="card-top-line" />
        <div className="category-card-content">
          <h2>{mainCategoryName}</h2>

          {showStatusMessage && (
            <div>
              <p>
                <strong>
                  <span>{language.parentCategoryIs}</span>
                  <span> {language[statusMessage]}</span>
                </strong>
              </p>
              <span>
                {subCategoryName} {language.notVisibleInShop}.
              </span>
            </div>
          )}
          <Button>{language.edit}</Button>
          <span>
            {language.createdAt} <DateDisplay date={createdAt} />
          </span>
        </div>
      </section>
    </div>
  );
};
export default CategoryCard;
