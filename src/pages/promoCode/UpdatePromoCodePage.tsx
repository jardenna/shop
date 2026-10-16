import { useParams } from 'react-router';
import NotFoundError from '../../components/NotFoundError';
import SkeletonFormPage from '../../components/skeleton/SkeletonFormPage';
import { useLanguage } from '../../features/language/useLanguage';
import { useGetPromoCodeByIdQuery } from '../../features/promoCodes/promoCodeApiSlice';
import { AdminPath } from '../../layout/nav/enums';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const UpdatePromoCodePage = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const {
    data: promoCode,
    isError,
    error,
    isLoading,
  } = useGetPromoCodeByIdQuery(id ?? '');
  console.log(promoCode);

  if (isError) {
    return (
      <NotFoundError
        error={error}
        btnLabel="categories"
        path={AdminPath.AdminCategories}
      />
    );
  }

  if (isLoading) {
    return <SkeletonFormPage />;
  }

  return (
    <AdminPageContainer heading={language.updatePromoCode} variant="medium">
      hello
    </AdminPageContainer>
  );
};

export default UpdatePromoCodePage;
