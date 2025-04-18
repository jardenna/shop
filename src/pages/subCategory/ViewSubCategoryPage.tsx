import { ErrorBoundary } from 'react-error-boundary';
import { Link, useNavigate, useParams } from 'react-router';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import PageHeader from '../../components/PageHeader';
import CategoryCard from '../../components/categoryCard/CategoryCard';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import { SecondaryActionBtnProps } from '../../components/modal/Modal';
import ModalContainer from '../../components/modal/ModalContainer';
import useLanguage from '../../features/language/useLanguage';
import {
  useDeleteSubCategoryMutation,
  useGetSubCategoryByIdQuery,
} from '../../features/subCategories/subCategoryApiSlice';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant, SizeVariant } from '../../types/enums';

const ViewSubCategoryPage = () => {
  const { language } = useLanguage();
  const params = useParams();
  const navigate = useNavigate();
  const {
    data: category,
    isLoading,
    isError,
    refetch,
  } = useGetSubCategoryByIdQuery(params.id || '', {
    refetchOnMountOrArgChange: true,
  });

  const { onAddMessagePopup } = useMessagePopup();
  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  const handleDeleteSubCategory = async () => {
    try {
      const result = await deleteSubCategory(params.id || '').unwrap();

      if (result.success) {
        navigate(`/admin/${MainPath.AdminSubCategories}`);
        onAddMessagePopup({
          messagePopupType: 'success',
          message: language.categoryUpdated,
        });
      } else {
        onAddMessagePopup({
          messagePopupType: 'error',
          message: language.categoryUpdated,
          componentType: 'notification',
        });
      }
    } catch (error: any) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
    }
  };

  const primaryActionBtn = {
    onClick: handleDeleteSubCategory,
    label: language.delete,
    variant: BtnVariant.Danger,
  };

  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="page page-medium">
      <PageHeader
        heading={language.category}
        linkText={language.createNewCategory}
        linkTo={`/admin/${MainPath.AdminSubCategoryCreate}`}
      />
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => refetch}
      >
        <div className="page-card">
          {!isError && category ? (
            <>
              <CategoryCard
                createdAt={category.createdAt}
                subCategoryName={category.subCategoryName}
                totalProducts={category.productCount}
                mainCategoryName={category.mainCategory.categoryName}
                showStatusMessage={
                  category.mainCategory.categoryStatus !== 'Published'
                }
                scheduledDate={category.scheduledDate || null}
                statusMessage={category.mainCategory.categoryStatus.toLocaleLowerCase()}
                status={category.categoryStatus}
              />

              <div className="footer-buttons">
                <ModalContainer
                  triggerModalBtnContent={language.delete}
                  triggerModalBtnVariant={BtnVariant.Danger}
                  id={category.id}
                  primaryActionBtn={primaryActionBtn}
                  secondaryActionBtn={secondaryActionBtn}
                  modalSize={SizeVariant.Md}
                  modalHeaderText={language.deleteCategory}
                >
                  {language.sureToDelete} {category.subCategoryName}
                </ModalContainer>

                <Link
                  to={`/admin/${MainPath.AdminSubCategoryUpdate}/${category.id}`}
                >
                  {language.editSubCategory}
                </Link>
              </div>
            </>
          ) : (
            <span>error..</span>
          )}
        </div>
      </ErrorBoundary>
    </section>
  );
};

export default ViewSubCategoryPage;
