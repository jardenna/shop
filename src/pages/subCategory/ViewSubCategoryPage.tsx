import { useNavigate, useParams } from 'react-router';
import CategoryCard from '../../components/adminCard/CategoryCard';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import useLanguage from '../../features/language/useLanguage';
import {
  useDeleteSubCategoryMutation,
  useGetSubCategoryByIdQuery,
} from '../../features/subCategories/subCategoryApiSlice';
import { MainPath } from '../../layout/nav/enums';
import PageContainer from '../PageContainer';

const ViewSubCategoryPage = () => {
  const { language } = useLanguage();
  const params = useParams();
  const navigate = useNavigate();
  const {
    data: category,
    isLoading,
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
    <article className="page page-medium">
      {isLoading && <SkeletonPage />}
      {category && (
        <PageContainer
          heading={`${language.category} ${category.subCategoryName}`}
          linkText={language.createNewCategory}
          linkTo={`/admin/${MainPath.AdminSubCategoryCreate}`}
          onReset={() => refetch}
        >
          <CategoryCard
            onReset={() => refetch}
            onDeleteSubCategory={handleDeleteSubCategory}
            categoryId={category.id}
            createdAt={category.createdAt}
            subCategoryName={category.subCategoryName}
            totalProducts={category.productCount}
            mainCategoryName={category.mainCategory.categoryName}
            showStatusMessage={
              category.mainCategory.categoryStatus !== 'Published'
            }
            scheduledDate={category.scheduledDate || null}
            statusMessage={category.mainCategory.categoryStatus.toLowerCase()}
            status={category.categoryStatus}
          />
        </PageContainer>
      )}
    </article>
  );
};

export default ViewSubCategoryPage;
