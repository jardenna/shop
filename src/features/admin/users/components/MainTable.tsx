import { FC, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { UserResponse } from '../../../../app/api/apiTypes';
import Dropdown from '../../../../components/dropdown/Dropdown';
import Icon from '../../../../components/icons/Icon';
import Table from '../../../../components/table/Table';
import TableGridList from '../../../../components/TableGridList';
import useFormValidation from '../../../../hooks/useFormValidation';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { TableHeaders } from '../../../../pages/admin/UsersPage';
import { BtnVariant, IconName } from '../../../../types/enums';
import { ChangeInputType, DirectionType } from '../../../../types/types';
import useLanguage from '../../../language/useLanguage';
import sortTableData from '../sortTableData';
import TableHeaderCell from './TableHeaderCell';

interface MainTableProps {
  isLoading: boolean;
  isPending: boolean;
  tableCaption: string;
  tableData: UserResponse[];
  tableHeaders: TableHeaders[];
  onDeleteUser: (id: string, username: string) => void;
}

const MainTable: FC<MainTableProps> = ({
  isLoading,
  isPending,
  tableCaption,
  tableData,
  tableHeaders,
  onDeleteUser,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useLanguage();
  const [padding, setPadding] = useLocalStorage('padding', 12);
  const [sort, setSort] = useState<{
    keyToSort: string;
    direction: DirectionType;
  }>({
    keyToSort: 'username',
    direction: 'asc',
  });

  const handleSortRows = (key: string) => {
    searchParams.set('sortField', sort.direction);
    searchParams.set('sortOrder', sort.keyToSort);
    setSearchParams(searchParams);
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

  const initialState = {
    username: '',
    email: '',
    role: '',
  };

  const { onChange, values, onClearAllValues } = useFormValidation({
    initialState,
  });

  const handleFilterRows = (event: ChangeInputType) => {
    const { name, value } = event.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }

    setSearchParams(searchParams);
    onChange(event);
  };

  const handleClearAll = () => {
    onClearAllValues();
    setSearchParams();
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
      <TableGridList
        onSetPadding={setPadding}
        tableGridIconList={tableGridIconList}
        isActive={padding}
      />
      <Table isLoading={isLoading} tableCaption={tableCaption}>
        <thead>
          <tr>
            {tableHeaders.map(({ id, label, key }) => (
              <th
                scope="col"
                style={{ paddingTop: padding, paddingBottom: padding }}
                key={id}
              >
                <TableHeaderCell
                  sortKey={key}
                  label={label}
                  sort={sort}
                  values={values}
                  onFilterRows={handleFilterRows}
                  onClearAllValues={handleClearAll}
                  onSortRows={handleSortRows}
                />
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
                <td style={{ paddingTop: padding, paddingBottom: padding }}>
                  {username}
                </td>
                <td>
                  <a href={`mailto:${email}`}>{email}</a>
                </td>
                <td>
                  <span className="user-role">{role}</span>
                </td>
                <td>
                  <div>
                    {role !== 'admin' && (
                      <Dropdown
                        ariaControls="delete-user"
                        text={`${language.sureToDelete} ${username}?`}
                        btnVariant={BtnVariant.Ghost}
                        onPrimaryClick={() => {
                          onDeleteUser(id, username);
                        }}
                        primaryBtnLabel={language.delete}
                        primaryBtnClassName="danger"
                        ariaLabel={language.deleteCustomer}
                        className="danger"
                      >
                        <Icon
                          iconName={IconName.Trash}
                          title={language.trashCan}
                          ariaLabel={language.deleteCustomer}
                        />
                      </Dropdown>
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default MainTable;
