import { useParams } from 'react-router';
import { useLanguage } from '../../features/language/useLanguage';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const UpdatePromoCodePage = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  console.log(id);

  // if (isError) {
  //   return (
  //     <NotFoundError
  //       error={error}
  //       btnLabel="categories"
  //       path={AdminPath.AdminCategories}
  //     />
  //   );
  // }

  // if (isLoading) {
  //   return <SkeletonFormPage />;
  // }

  return (
    <AdminPageContainer heading={language.updateCategory} variant="medium">
      hello
    </AdminPageContainer>
  );
};

export default UpdatePromoCodePage;
