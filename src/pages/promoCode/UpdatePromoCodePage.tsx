import { useParams } from 'react-router';
import { useLanguage } from '../../features/language/useLanguage';
import { useGetPromoCodeByIdQuery } from '../../features/promoCodes/promoCodeApiSlice';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const UpdatePromoCodePage = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const { data: promoCode } = useGetPromoCodeByIdQuery(id ?? '');
  console.log(promoCode);

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
    <AdminPageContainer heading={language.updatePromoCode} variant="medium">
      hello
    </AdminPageContainer>
  );
};

export default UpdatePromoCodePage;
