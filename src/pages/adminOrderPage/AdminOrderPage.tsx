import { usePaginationText } from '../../components/pagination/hooks/usePaginationText';
import { useScrollOnPagination } from '../../components/pagination/hooks/useScrollOnPagination';
import Pagination from '../../components/pagination/Pagination';
import Table from '../../components/sortTable/Table';
import { createInitialFilters } from '../../components/sortTable/tableFilters/tableFiltersUtils';
import { useLanguage } from '../../features/language/useLanguage';
import { useGetAllAdminOrdersQuery } from '../../features/orders/aOrderApiSlice';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { useSearchParamsState } from '../../hooks/useSearchParamsState';
import { useSortParamsState } from '../../hooks/useSortParamsState';
import { Options } from '../../types/types';
import AdminPageContainer from '../pageContainer/AdminPageContainer';
import { tableHeaders } from './orderTableHeaders';
import OrderTableRow from './OrderTableRow';

const AdminOrderPage = () => {
  const { language } = useLanguage();
  const { sortOrder, onSort, sortField } = useSortParamsState({
    columns: tableHeaders,
  });

  const initialFilters = createInitialFilters(tableHeaders);

  const {
    filterParams,
    setFilterParams,
    onRemoveFilterTag,
    page,
    itemsPerPage,
    setPage,
    updatePagination,
  } = useSearchParamsState(initialFilters);

  const debounceCustomerName = useDebouncedValue(filterParams.customer);
  const debounceCreatedAt = useDebouncedValue(filterParams.createdAt);
  const debounceOrderId = useDebouncedValue(filterParams.id);
  const debounceOrderMaxprice = useDebouncedValue(filterParams.maxTotalPrice);
  const debounceOrderMinprice = useDebouncedValue(filterParams.minTotalPrice);

  const {
    data: allOrders,
    isLoading,
    refetch,
  } = useGetAllAdminOrdersQuery({
    ordersPerPage: itemsPerPage,
    page: page.toString(),
    sortField,
    sortOrder,
    customer: debounceCustomerName,
    paymentMethod: filterParams.paymentMethod.toLowerCase(),
    paymentStatus: filterParams.paymentStatus.toUpperCase(),
    deliveryStatus: filterParams.deliveryStatus.toLowerCase(),
    createdAt: debounceCreatedAt,
    id: debounceOrderId,
    maxTotalPrice: debounceOrderMaxprice,
    minTotalPrice: debounceOrderMinprice,
  });

  const totalBtns = allOrders?.pages ?? 1;
  const itemCount = allOrders ? allOrders.orderCount : 0;

  const handleSelectCount = (option: Options) => {
    const newCount = Number(option.value);
    updatePagination(1, newCount);
  };

  const { scrollToRef, setShouldScroll } = useScrollOnPagination({
    isLoading,
  });

  const handlePagination = (id: number) => {
    // Early exit so current page doesn't spam history or rerender
    if (id === page) {
      return;
    }
    setPage(id);
    setShouldScroll(true);
  };

  const { paginationMobileText } = usePaginationText({
    page,
    itemsPerPage,
    itemCount,
    totalBtns,
    language,
  });

  return (
    <AdminPageContainer
      heading={language.orders}
      variant="x-large"
      scrollToRef={scrollToRef}
    >
      <Table
        onRemoveFilterTag={onRemoveFilterTag}
        values={filterParams}
        onFilter={setFilterParams}
        initialFilters={initialFilters}
        onReset={() => refetch()}
        data={allOrders?.orders ?? []}
        columns={tableHeaders}
        tableCaption={language.orderList}
        isLoading={isLoading}
        emptyHeaderCellText={language.orderActions}
        onSort={onSort}
        sortField={sortField}
        sortOrder={sortOrder}
      >
        {(data) =>
          data.map(
            ({
              id,
              createdAt,
              customer,
              deliveryStatus,
              paymentMethod,
              paymentStatus,
              totalPrice,
            }) => (
              <OrderTableRow
                key={id}
                id={id}
                customer={customer}
                deliveryStatus={deliveryStatus}
                paymentMethod={paymentMethod}
                paymentStatus={paymentStatus}
                totalPrice={totalPrice}
                createdAt={createdAt}
                language={language}
              />
            ),
          )
        }
      </Table>

      <Pagination
        totalBtns={totalBtns}
        page={page}
        onPagination={handlePagination}
        onSelectCount={handleSelectCount}
        totalCount={itemCount}
        paginationMobileText={paginationMobileText}
        defaultValue={{
          value: itemsPerPage.toString(),
          label: itemsPerPage.toString(),
        }}
      />
    </AdminPageContainer>
  );
};

export default AdminOrderPage;
