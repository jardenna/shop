import useLanguage from '../../features/language/useLanguage';
import './_category-card.scss';

type CategoryCardProps = {
  subCategoryName: string;
  totalProducts: number;
};

const CategoryCard = ({
  subCategoryName,
  totalProducts,
}: CategoryCardProps) => {
  const { language } = useLanguage();
  return (
    <div className="category-card">
      <section className="category-card-content">
        <span className="card-top-line" />
        <div className="category-card-left">
          <h2>{subCategoryName}</h2>
          <span>{language.totalProducts}:</span>
          <span>{totalProducts}</span>
        </div>
      </section>
      <section className="category-card-content card-info">
        <span className="card-top-line" />
        <div className="category-card-right">
          <h2>Kids</h2>
          <span>Created 23. april 2025</span>
        </div>
      </section>
    </div>
  );
};
export default CategoryCard;
