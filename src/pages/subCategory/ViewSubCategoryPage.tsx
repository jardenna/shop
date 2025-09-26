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
import { getlowerCaseFirstLetter } from '../../utils/utils';
import PageContainer from '../pageContainer/PageContainer';

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
          messagePopupType: 'success',
          message: language.categoryDeleted,
        });
      } else {
        onAddMessagePopup({
          messagePopupType: 'error',
          message: language.categoryNotFound,
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

  return (
    <article className="admin-page page-medium">
      {isLoading && <SkeletonTwoCards />}
      {category && (
        <PageContainer
          heading={`${language.category} ${category.subCategoryName}`}
          linkText={language.createNewCategory}
          linkTo={AdminPath.AdminSubCategoryCreate}
          onReset={() => refetch()}
        >
          <CategoryCard
            onReset={() => refetch()}
            onDeleteSubCategory={handleDeleteSubCategory}
            categoryId={category.id}
            subCategoryName={category.subCategoryName}
            productsInSubcategory={category.productCount}
            mainCategoryName={category.mainCategory.categoryName}
            showStatusMessage={
              category.mainCategory.categoryStatus !== 'Published'
            }
            scheduledDate={category.scheduledDate || null}
            statusMessage={getlowerCaseFirstLetter(
              category.mainCategory.categoryStatus,
              language,
            )}
            status={category.categoryStatus}
          />
        </PageContainer>
      )}
    </article>
  );
};

export default ViewSubCategoryPage;
