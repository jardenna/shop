import Table from '../../components/sortTable/Table';
import { createInitialFilters } from '../../components/sortTable/tableFilters/tableFiltersUtils';
import { useLanguage } from '../../features/language/useLanguage';
import { useGetAllOrdersQuery } from '../../features/orders/orderApiSlice';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { useSearchParamsState } from '../../hooks/useSearchParamsState';
import { useSortParamsState } from '../../hooks/useSortParamsState';
import AdminPageContainer from '../pageContainer/AdminPageContainer';
import { tableHeaders } from './orderTableHeaders';
import OrderTableRow from './OrderTableRow';

const AdminOrderPage = () => {
  const { language } = useLanguage();
  const { sortOrder, onSort, sortField } = useSortParamsState({
    columns: tableHeaders,
  });

  const initialFilters = createInitialFilters(tableHeaders);

  const { filterParams, setFilterParams, onRemoveFilterTag } =
    useSearchParamsState(initialFilters);

  const debounceCustomerName = useDebouncedValue(filterParams.customer);
  const debounceCreatedAt = useDebouncedValue(filterParams.createdAt);
  const debounceOrderId = useDebouncedValue(filterParams.id);

  const {
    data: orders,
    isLoading,
    refetch,
  } = useGetAllOrdersQuery({
    sortField,
    sortOrder,
    customer: debounceCustomerName,
    paymentMethod: filterParams.paymentMethod,
    paymentStatus: filterParams.paymentStatus,
    deliveryStatus: filterParams.deliveryStatus,
    createdAt: debounceCreatedAt,
    id: debounceOrderId,
  });

  return (
    <AdminPageContainer heading={language.orders} variant="x-large">
      {orders && (
        <Table
          onRemoveFilterTag={onRemoveFilterTag}
          values={filterParams}
          onFilter={setFilterParams}
          initialFilters={initialFilters}
          onReset={() => refetch()}
          data={orders}
          columns={tableHeaders}
          tableCaption={language.categoryList}
          isLoading={isLoading}
          emptyHeaderCellText={language.updateCategory}
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
                  linkText={language.update}
                  language={language}
                />
              ),
            )
          }
        </Table>
      )}
    </AdminPageContainer>
  );
};

export default AdminOrderPage;
