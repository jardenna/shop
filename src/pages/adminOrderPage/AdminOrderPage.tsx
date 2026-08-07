import Table from '../../components/sortTable/Table';
import { createInitialFilters } from '../../components/sortTable/tableFilters/tableFiltersUtils';
import { useLanguage } from '../../features/language/useLanguage';
import { useGetAllOrdersQuery } from '../../features/orders/orderApiSlice';
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

  const { data: orders, isLoading, refetch } = useGetAllOrdersQuery();

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
