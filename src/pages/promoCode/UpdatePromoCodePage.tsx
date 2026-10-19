import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import NotFoundError from '../../components/NotFoundError';
import SkeletonFormPage from '../../components/skeleton/SkeletonFormPage';
import { useLanguage } from '../../features/language/useLanguage';
import PromoCodeForm from '../../features/promoCodes/components/PromoCodeForm';
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
    refetch,
  } = useGetPromoCodeByIdQuery(id ?? '');

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
    <AdminPageContainer
      heading={`${language.updatePromoCode} ${promoCode?.code ?? ''}`}
      variant="medium"
    >
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => {
          refetch();
        }}
      >
        {promoCode && <PromoCodeForm id={id ?? null} promoCode={promoCode} />}
      </ErrorBoundary>
    </AdminPageContainer>
  );
};

export default UpdatePromoCodePage;
