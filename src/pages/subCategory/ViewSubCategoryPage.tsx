import { ErrorBoundary } from 'react-error-boundary';
import { Link, useNavigate, useParams } from 'react-router';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import PageHeader from '../../components/PageHeader';
import DateDisplay from '../../components/datePicker/DateDisplay';
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

  const {
    data: category,
    isLoading,
    isError,
    refetch,
  } = useGetSubCategoryByIdQuery(params.id || '');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="page page-small">
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
            <div>
              <div>
                {language.name}: {category.subCategoryName}
              </div>
              <div>
                {language.totalProducts} {category.productCount}
              </div>
              <div>
                {language.status}: {category.categoryStatus}
              </div>
              {category.scheduledDate && (
                <div>
                  {language.date}:
                  <DateDisplay
                    date={category.scheduledDate}
                    hour="2-digit"
                    minute="2-digit"
                  />
                </div>
              )}

              <div>
                {language.parentCategory}: {category.mainCategory.categoryName}
              </div>

              {category.categoryStatus !== 'Published' && (
                <div>
                  <span>{language.categoryIsCurrently}</span>
                  <span>
                    {language[category.categoryStatus.toLocaleLowerCase()]}
                  </span>
                  <span>{language.categoryWillNotBeVisible}</span>
                </div>
              )}

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
            </div>
          ) : (
            <span>error..</span>
          )}
        </div>
      </ErrorBoundary>
    </section>
  );
};

export default ViewSubCategoryPage;
