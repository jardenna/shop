import { useNavigate, useParams } from 'react-router';
import CategoryCard from '../../components/adminCard/CategoryCard';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import SkeletonTwoCards from '../../components/skeleton/SkeletonTwoCards';
import useLanguage from '../../features/language/useLanguage';
import {
  useDeleteSubCategoryMutation,
  useGetSubCategoryByIdQuery,
} from '../../features/subCategories/subCategoryApiSlice';
import { AdminPath } from '../../layout/nav/enums';
import handleApiError from '../../utils/handleApiError';
import { translateKey } from '../../utils/utils';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const ViewSubCategoryPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const { onAddMessagePopup } = useMessagePopup();

  // Redux hooks
  const {
    data: category,
    isLoading,
    refetch,
  } = useGetSubCategoryByIdQuery(params.id || '', {
    refetchOnMountOrArgChange: true,
  });

  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  const handleDeleteSubCategory = async () => {
    try {
      const result = await deleteSubCategory(params.id || '').unwrap();

      if (result.success) {
        navigate(AdminPath.AdminSubCategories);
        onAddMessagePopup({
          message: language.categoryDeleted,
          withDelay: true,
        });
      } else {
        onAddMessagePopup({
          messagePopupType: 'error',
          message: language.categoryNotFound,
          componentType: 'notification',
        });
      }
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  };

  const subCategoryName = category ? language[category.translationKey] : '';

  return (
    <>
      {isLoading && <SkeletonTwoCards />}
      {category && (
        <AdminPageContainer
          heading={`${language.category} ${subCategoryName || category.subCategoryName}`}
          ariaLabelledby="sub-category"
          linkText={language.createNewCategory}
          linkTo={AdminPath.AdminSubCategoryCreate}
          variant="medium"
        >
          <CategoryCard
            onReset={() => refetch()}
            onDeleteSubCategory={handleDeleteSubCategory}
            categoryId={category.id}
            subCategoryName={subCategoryName || category.subCategoryName}
            productsInSubcategory={category.productCount}
            mainCategoryName={category.mainCategory.categoryName}
            showStatusMessage={
              category.mainCategory.categoryStatus !== 'Published'
            }
            scheduledDate={category.scheduledDate || null}
            statusMessage={translateKey(
              category.mainCategory.categoryStatus,
              language,
            )}
            status={category.categoryStatus}
          />
        </AdminPageContainer>
      )}
    </>
  );
};

export default ViewSubCategoryPage;
