import { useNavigate, useParams } from 'react-router';
import { adminUrl } from '../../app/endpoints';
import CategoryCard from '../../components/adminCard/CategoryCard';
import ErrorContent from '../../components/ErrorContent';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import SkeletonTwoCards from '../../components/skeleton/SkeletonTwoCards';
import useLanguage from '../../features/language/useLanguage';
import {
  useDeleteSubCategoryMutation,
  useGetSubCategoryByIdQuery,
} from '../../features/subCategories/subCategoryApiSlice';
import { MainPath } from '../../layout/nav/enums';
import { getErrorMessage, getlowerCaseFirstLetter } from '../../utils/utils';
import PageContainer from '../pageContainer/PageContainer';

const ViewSubCategoryPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleGoback = () => {
    navigate(-1);
  };

  const { onAddMessagePopup } = useMessagePopup();

  // Redux hooks
  const {
    data: category,
    isLoading,
    refetch,
    error,
  } = useGetSubCategoryByIdQuery(params.id || '', {
    refetchOnMountOrArgChange: true,
  });

  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  const handleDeleteSubCategory = async () => {
    try {
      const result = await deleteSubCategory(params.id || '').unwrap();

      if (result.success) {
        navigate(`${adminUrl}${MainPath.AdminSubCategories}`);
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
      {error && (
        <ErrorContent
          onClick={handleGoback}
          errorText={getErrorMessage(error)}
          btnLabel={language.goBack}
        />
      )}
      {isLoading && <SkeletonTwoCards />}
      {category && (
        <PageContainer
          heading={`${language.category} ${category.subCategoryName}`}
          linkText={language.createNewCategory}
          linkTo={`${adminUrl}${MainPath.AdminSubCategoryCreate}`}
          onReset={() => refetch}
        >
          <CategoryCard
            onReset={() => refetch}
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
