import { FC, useMemo, useState } from 'react';
import { UserResponse } from '../../../../app/api/apiTypes';
import IconBtn from '../../../../components/IconBtn';
import Table from '../../../../components/table/Table';
import TableGridList from '../../../../components/TableGridList';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { TableHeaders } from '../../../../pages/admin/UsersPage';
import { IconName } from '../../../../types/enums';
import { ChangeInputType } from '../../../../types/types';
import useLanguage from '../../../language/useLanguage';
import sortTableData, { DirectionType } from '../sortTableData';
import SearchField from './SearchField';

interface MainTableProps {
  isLoading: boolean;
  isPending: boolean;
  tableCaption: string;
  tableData: UserResponse[];
  tableHeaders: TableHeaders[];
  onDeleteUser: (id: string) => void;
}

const MainTable: FC<MainTableProps> = ({
  isLoading,
  isPending,
  tableCaption,
  tableData,
  tableHeaders,
  onDeleteUser,
}) => {
  const { language } = useLanguage();
  const [padding, setPadding] = useLocalStorage('padding', 12);
  const [sort, setSort] = useState<{
    keyToSort: string;
    direction: DirectionType;
  }>({
    keyToSort: 'username',
    direction: 'asc',
  });

  const handleHeaderClick = (key: string) => {
    setSort((prev) => ({
      keyToSort: key,
      direction:
        prev.keyToSort === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedData = useMemo(
    () => sortTableData(tableData, sort.keyToSort, sort.direction),
    [tableData, sort],
  );

  const tableGridIconList = [
    { padding: 4, iconName: IconName.GridSmall, title: language.gridSmall },
    { padding: 12, iconName: IconName.Grid, title: language.grid },
    { padding: 20, iconName: IconName.GridLarge, title: language.gridLarge },
  ];

  const [values, setValues] = useState<{ [key: string]: string }>({
    username: '',
    email: '',
    role: '',
  });

  const handleFilterRows = (event: ChangeInputType) => {
    const { value, name } = event.target;

    setValues({ ...values, [name]: value });
  };

  const filteredAndSortedData = useMemo(() => {
    const filteredData = tableData.filter((row) =>
      Object.entries(values).every(([key, value]) =>
        value
          ? (row[key as keyof UserResponse] as string)
              .toLowerCase()
              .includes(value.toLowerCase())
          : true,
      ),
    );

    return sortTableData(filteredData, sort.keyToSort, sort.direction);
  }, [tableData, sort, values]);

  return (
    <>
      <div className="table-actions">
        <TableGridList
          onSetPadding={setPadding}
          tableGridIconList={tableGridIconList}
          isActive={padding}
        />
      </div>

      <Table isLoading={isLoading} tableCaption={tableCaption}>
        <thead>
          <tr>
            {tableHeaders.map(({ id, label, key }) => (
              <th
                scope="col"
                style={{ paddingTop: padding, paddingBottom: padding }}
                key={id}
              >
                {label}
                {key && (
                  <>
                    <IconBtn
                      onClick={() => {
                        handleHeaderClick(key);
                      }}
                      ariaLabel="sort"
                      iconName={IconName.Account}
                      title="sort"
                    />
                    <SearchField
                      onFilterRows={handleFilterRows}
                      title={key}
                      value={values[key]}
                    />
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sortedData.length === 0 && !isPending && (
            <tr>
              <td
                colSpan={tableHeaders.length}
                className="no-records-table-field"
              >
                <span className="no-record-info">{language.noAlbumFound}</span>
              </td>
            </tr>
          )}

          {isPending && (
            <tr>
              <td
                colSpan={tableHeaders.length}
                className="no-records-table-field"
              >
                skeleton
              </td>
            </tr>
          )}

          {!isPending &&
            filteredAndSortedData.length > 0 &&
            filteredAndSortedData.map(({ id, username, email, role }) => (
              <tr key={id}>
                <td>{username}</td>
                <td>
                  <a href={`mailto:${email}`}>{email}</a>
                </td>
                <td>
                  <span className="user-role">{role}</span>
                </td>
                <td className="delete-user-cell">
                  <IconBtn
                    iconName={IconName.Trash}
                    className="danger"
                    title={language.trashCan}
                    ariaLabel={language.deleteCustomer}
                    onClick={() => {
                      onDeleteUser(id);
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default MainTable;
