import { FC, useMemo, useState } from 'react';
import { UserResponse } from '../../../../app/api/apiTypes';
import Dropdown from '../../../../components/dropdown/Dropdown';
import IconBtn from '../../../../components/IconBtn';
import Icon from '../../../../components/icons/Icon';
import Table from '../../../../components/table/Table';
import TableGridList from '../../../../components/TableGridList';
import useFormValidation from '../../../../hooks/useFormValidation';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { TableHeaders } from '../../../../pages/admin/UsersPage';
import { BtnVariant, IconName } from '../../../../types/enums';
import useLanguage from '../../../language/useLanguage';
import sortTableData, { DirectionType } from '../sortTableData';
import SearchField from './SearchField';

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

  const { onChange, values, onClearAll } = useFormValidation<{
    username: string;
    email: string;
    role: string;
  }>({
    initialState,
  });

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
                <section className="sort-container">
                  <div className="sort">
                    {label}
                    {key && (
                      <IconBtn
                        onClick={() => {
                          handleSortRows(key);
                        }}
                        ariaLabel="sort"
                        iconName={
                          sort.direction === 'asc' && sort.keyToSort === key
                            ? IconName.ArrowUp
                            : IconName.ArrowDown
                        }
                        title="sort"
                      />
                    )}
                  </div>

                  {key && (
                    <SearchField
                      onFilterRows={onChange}
                      title={key}
                      value={values[key as keyof typeof values]}
                    />
                  )}

                  {!key && (
                    <IconBtn
                      iconName={IconName.Undo}
                      title={language.reset}
                      ariaLabel={language.resetFiltersAndSorting}
                      onClick={onClearAll}
                    />
                  )}
                </section>
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
