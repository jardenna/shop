import Table from '../../components/sortTable/Table';
import { createInitialFilters } from '../../components/sortTable/tableFilters/tableFiltersUtils';
import { useLanguage } from '../../features/language/useLanguage';
import SubCategoryTableRows from '../../features/subCategories/components/SubCategoryTableRows';
import {
  useGetAllSubCategoriesQuery,
  useGetHasSubCatScheduledQuery,
} from '../../features/subCategories/subCategoryApiSlice';
import { useSearchParamsState } from '../../hooks/useSearchParamsState';
import { useSortParamsState } from '../../hooks/useSortParamsState';
import { AdminPath } from '../../layout/nav/enums';
import { oneDay, translateKey } from '../../utils/utils';
import AdminPageContainer from '../pageContainer/AdminPageContainer';
import { tableHeaders } from './subCategoryTableHeaders';

const SubCategoryPage = () => {
  const { language } = useLanguage();

  const { sortOrder, onSort, sortField } = useSortParamsState({
    columns: tableHeaders,
  });

  const { data: hasScheduledData } = useGetHasSubCatScheduledQuery(undefined, {
    pollingInterval: oneDay,
  });

  const shouldPollFullList = hasScheduledData?.hasScheduled ?? false;

  const initialFilters = createInitialFilters(tableHeaders);

  const { filterParams, setFilterParams } =
    useSearchParamsState(initialFilters);

  const {
    data: allSubcategories,
    isLoading,
    refetch,
  } = useGetAllSubCategoriesQuery(
    { sortOrder, sortField },
    {
      pollingInterval: shouldPollFullList ? 15000 : undefined,
      refetchOnMountOrArgChange: true,
    },
  );

  return (
    <AdminPageContainer
      heading={language.subCategories}
      linkText={language.createNewCategory}
      linkTo={AdminPath.AdminSubCategoryCreate}
      variant="medium"
      ariaLabelledby="sub-categories-list"
    >
      <Table
        values={filterParams}
        onFilter={setFilterParams}
        initialFilters={initialFilters}
        onReset={() => refetch()}
        data={allSubcategories?.subCategories || []}
        columns={tableHeaders}
        tableCaption={language.subCategoryList}
        isLoading={isLoading}
        emptyHeaderCellText={language.viewCategory}
        onSort={onSort}
        sortField={sortField}
        sortOrder={sortOrder}
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
                mainCategoryName={translateKey(mainCategoryName, language)}
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
