import { FC, memo, useMemo, useState } from 'react';
import { UserResponse } from '../../../../app/api/apiTypes';
import IconBtn from '../../../../components/IconBtn';
import Table from '../../../../components/table/Table';
import TableGridList from '../../../../components/TableGridList';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { TableHeaders } from '../../../../pages/admin/UsersPage';
import { IconName } from '../../../../types/enums';
import useLanguage from '../../../language/useLanguage';
import sortTableData, { DirectionType } from '../sortTableData';

interface MainTableProps {
  isLoading: boolean;
  isPending: boolean;
  tableCaption: string;
  tableData: UserResponse[];
  tableHeaders: TableHeaders[];
}

const MainTable: FC<MainTableProps> = ({
  isLoading,
  isPending,
  tableCaption,
  tableData,
  tableHeaders,
}) => {
  const { language } = useLanguage();
  const [padding, setPadding] = useLocalStorage('padding', 12);
  const [sort, setSort] = useState<{
    keyToSort: string | null;
    direction: DirectionType;
  }>({
    keyToSort: 'username',
    direction: 'asc',
  });

  const handleHeaderClick = (tableHeader: TableHeaders) => {
    let newDirection: 'asc' | 'desc' = 'desc';
    if (tableHeader.key === sort.keyToSort) {
      newDirection = sort.direction === 'asc' ? 'desc' : 'asc';
    }
    setSort({ keyToSort: tableHeader.key, direction: newDirection });
  };

  const handlePadding = (paddingStyle: number) => {
    setPadding(paddingStyle);
  };

  const sortedData = useMemo(
    () =>
      sort.keyToSort
        ? sortTableData(tableData, sort.keyToSort, sort.direction)
        : tableData,
    [tableData, sort],
  );
  const style = {
    paddingTop: padding,
    paddingBottom: padding,
  };

  const tableGridIconList = [
    { padding: 4, iconName: IconName.GridSmall, title: language.gridSmall },
    { padding: 12, iconName: IconName.Grid, title: language.grid },
    { padding: 20, iconName: IconName.GridLarge, title: language.gridLarge },
  ];

  return (
    <>
      <div className="table-actions">
        <TableGridList
          onSetPadding={handlePadding}
          tableGridIconList={tableGridIconList}
          isActive={padding}
        />
      </div>

      <Table isLoading={isLoading} tableCaption={tableCaption}>
        <thead>
          <tr>
            {tableHeaders.map((tableHeader) => (
              <th scope="col" style={style} key={tableHeader.id}>
                {tableHeader.label}
                {tableHeader.key && (
                  <IconBtn
                    onClick={() => {
                      handleHeaderClick(tableHeader);
                    }}
                    ariaLabel="sort"
                    iconName={IconName.Account}
                    title="sort"
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        {sortedData.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={6} className="no-records-table-field">
                <span className="no-record-info">{language.noAlbumFound}</span>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {!isPending ? (
              sortedData.map((data) => (
                <tr key={data.id}>
                  <td>{data.username}</td>
                  <td>
                    <a href={`mailto:${data.email}`}>{data.email}</a>
                  </td>
                  <td>
                    <span className="user-role">{data.role}</span>
                  </td>

                  <td className="delete-user-cell">
                    <IconBtn
                      iconName={IconName.Trash}
                      className="danger"
                      title={language.trashCan}
                      ariaLabel={language.deleteCustomer}
                      onClick={() => {
                        console.log(122);
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="no-records-table-field">
                  skeleton
                  {/* <SkeletonList
                    count={8}
                    className="column"
                    variant="secondary"
                  /> */}
                </td>
              </tr>
            )}
          </tbody>
        )}
      </Table>
    </>
  );
};

export default memo(MainTable);
