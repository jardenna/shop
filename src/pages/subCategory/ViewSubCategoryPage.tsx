import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate, useParams } from 'react-router';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import TopContainer from '../../components/TopContainer';
import DateDisplay from '../../components/datePicker/DateDisplay';
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
  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  const handleDeleteSubCategory = async () => {
    try {
      const result = await deleteSubCategory(params.id || '').unwrap();

      if (result.success) {
        navigate(MainPath.AdminSubCategories);
      } else {
        console.log(123);
      }
    } catch (error) {
      console.log(error);
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
    <section className="page">
      <TopContainer
        heading={language.categories}
        linkText={language.createNewCategory}
        linkTo={`/admin/${MainPath.AdminCategoryCreate}`}
      />
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => refetch}
      >
        <div className="page-card">
          {!isError && category ? (
            <div>
              <div>Name: {category.subCategoryName}</div>
              <div>Status: {category.categoryStatus}</div>
              {category.scheduledDate && (
                <div>
                  Date:
                  <DateDisplay
                    date={category.scheduledDate}
                    hour="2-digit"
                    minute="2-digit"
                  />
                </div>
              )}

              <div>Parent category: {category.mainCategory.categoryName}</div>
              <div>
                Be aware that this category is
                <span>inactive</span>
                <span>scheduled</span>
              </div>
              <ModalContainer
                triggerModalBtnContent={language.delete}
                triggerModalBtnVariant={BtnVariant.Danger}
                id="viewSubId"
                primaryActionBtn={primaryActionBtn}
                secondaryActionBtn={secondaryActionBtn}
                modalSize={SizeVariant.Md}
                modalHeaderText="Delete category"
              >
                {language.sureToDelete} {category.subCategoryName}
              </ModalContainer>
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
