import { useParams } from 'react-router';
import TopContainer from '../../components/TopContainer';
import useLanguage from '../../features/language/useLanguage';
import { useGetSubCategoryByIdQuery } from '../../features/subCategories/subCategoryApiSlice';
import { MainPath } from '../../layout/nav/enums';

const ViewSubCategoryPage = () => {
  const { language } = useLanguage();
  const params = useParams();

  const {
    data: category,
    isLoading,
    isError,
  } = useGetSubCategoryByIdQuery(params.id || '');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="page">
      <TopContainer
        heading={language.categories}
        linkText={language.createNewCategory}
        linkTo={`/admin/${MainPath.AdminCategoryCreate}`}
      />
      <div className="page-card">
        {!isError && category ? (
          <div>{category.subCategoryName}</div>
        ) : (
          <span>error..</span>
        )}
      </div>
    </section>
  );
};

export default ViewSubCategoryPage;
