import type { SubCategoryResponse } from '../../app/api/apiTypes/adminApiTypes';
import Table from '../../components/sortTable/Table';
import useLanguage from '../../features/language/useLanguage';
import SubCategoryTableRows from '../../features/subCategories/components/SubCategoryTableRows';
import {
  useGetAllSubCategoriesQuery,
  useGetHasSubCatScheduledQuery,
} from '../../features/subCategories/subCategoryApiSlice';
import { AdminPath } from '../../layout/nav/enums';
import { oneDay, translateKey } from '../../utils/utils';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const tableHeaders: {
  key: keyof SubCategoryResponse;
  label: string;
  name: string;
}[] = [
  {
    key: 'mainCategoryName',
    label: 'mainCategoryName',
    name: 'mainCategoryName',
  },
  {
    key: 'subCategoryName',
    label: 'name',
    name: 'subCategoryName',
  },
  { key: 'categoryStatus', label: 'status', name: 'categoryStatus' },
  { key: 'id', label: '', name: '' },
];

const SubCategoryPage = () => {
  const { language } = useLanguage();

  const { data: hasScheduledData } = useGetHasSubCatScheduledQuery(undefined, {
    pollingInterval: oneDay,
  });

  const shouldPollFullList = hasScheduledData?.hasScheduled ?? false;

  const {
    data: allSubcategories,
    isLoading,
    refetch,
  } = useGetAllSubCategoriesQuery(undefined, {
    pollingInterval: shouldPollFullList ? 15000 : undefined,
    refetchOnMountOrArgChange: true,
  });

  return (
    <AdminPageContainer
      heading={language.subCategories}
      linkText={language.createNewCategory}
      linkTo={AdminPath.AdminSubCategoryCreate}
      variant="medium"
      ariaLabelledby="sub-categories-list"
    >
      <Table
        onReset={() => refetch()}
        data={allSubcategories?.subCategories || []}
        columns={tableHeaders}
        tableCaption={language.subCategoryList}
        isLoading={isLoading}
        emptyHeaderCellText={language.viewCategory}
      >
        {(data) =>
          data.map(
            ({
              id,
              scheduledDate,
              subCategoryName,
              categoryStatus,
              mainCategoryName,
              translationKey,
            }) => (
              <SubCategoryTableRows
                key={id}
                id={id}
                status={categoryStatus}
                scheduledDate={scheduledDate || null}
                subCategoryName={language[translationKey] || subCategoryName}
                mainCategoryName={
                  translateKey(mainCategoryName, language) || mainCategoryName
                }
                linkText={language.viewCategory}
              />
            ),
          )
        }
      </Table>
    </AdminPageContainer>
  );
};

export default SubCategoryPage;
