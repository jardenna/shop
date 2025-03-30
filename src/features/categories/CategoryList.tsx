import { Category } from '../../app/api/apiTypes';

type CategoryListProps = {
  categories: Category[];
};

const CategoryList = ({ categories }: CategoryListProps) => (
  <section>
    <ul>
      {categories.map((category) => (
        <li key={category.id}>{category.name}</li>
      ))}
    </ul>
  </section>
);

export default CategoryList;
