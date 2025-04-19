import { useNavigate, useParams } from 'react-router';
import PageHeader from '../../components/PageHeader';
import CategoryCard from '../../components/categoryCard/CategoryCard';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import useLanguage from '../../features/language/useLanguage';
import {
  useDeleteSubCategoryMutation,
  useGetSubCategoryByIdQuery,
} from '../../features/subCategories/subCategoryApiSlice';
import { MainPath } from '../../layout/nav/enums';

const ViewSubCategoryPage = () => {
  const { language } = useLanguage();
  const params = useParams();
  const navigate = useNavigate();
  const { data: category, isLoading } = useGetSubCategoryByIdQuery(
    params.id || '',
    {
      refetchOnMountOrArgChange: true,
    },
  );

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="page page-medium">
      {category && (
        <>
          <PageHeader
            heading={`${language.category} ${category.subCategoryName}`}
            linkText={language.createNewCategory}
            linkTo={`/admin/${MainPath.AdminSubCategoryCreate}`}
          />
          <div className="page-card">
            <CategoryCard
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
              statusMessage={category.mainCategory.categoryStatus.toLocaleLowerCase()}
              status={category.categoryStatus}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default ViewSubCategoryPage;
