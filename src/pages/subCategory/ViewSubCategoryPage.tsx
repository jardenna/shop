import { useParams } from 'react-router';
import TopContainer from '../../components/TopContainer';
import useLanguage from '../../features/language/useLanguage';
import { useGetSubCategoryByIdQuery } from '../../features/subCategories/subCategoryApiSlice';
import { MainPath } from '../../layout/nav/enums';

const ViewSubCategoryPage = () => {
  const { language } = useLanguage();
  const params = useParams();

  const { data: category, isLoading } = useGetSubCategoryByIdQuery(
    params.id || '',
  );

  return (
    <section className="page">
      <TopContainer
        heading={language.categories}
        linkText={language.createNewCategory}
        linkTo={`/admin/${MainPath.AdminCategoryCreate}`}
      />
      <div className="page-card">
        {isLoading ? (
          <span>Loading..</span>
        ) : (
          <div>{category.subCategoryName}</div>
        )}
      </div>
    </section>
  );
};

export default ViewSubCategoryPage;
