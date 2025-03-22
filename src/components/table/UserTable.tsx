import { FC } from 'react';
import { useSearchParams } from 'react-router';
import { UserResponse } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import useFilter from './useFilter';
import UserTableHeaderCell from './UserTableHeaderCell';
import useSorting from './useSorting';

interface UserTableProps {
  tableData: UserResponse[];
  tableHeaders: string[];
}

const UserTable: FC<UserTableProps> = ({ tableHeaders, tableData }) => {
  const { language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const valuesFromParams = Object.fromEntries(searchParams);

  const initialState = {
    username: valuesFromParams.username || '',
    email: valuesFromParams.email || '',
    role: valuesFromParams.role || '',
  };

  const { sortedItems, sortFunction, sortDirection, onClearAllParams } =
    useSorting(tableData);

  const filterProps = {
    initialState,
    items: sortedItems,
  };

  const { onChange, values, filteredItems } = useFilter(filterProps);

  const onChangeSearch = (event: ChangeInputType) => {
    const { name, value } = event.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }

    setSearchParams(searchParams);
    onChange(event);
  };

  const handleClearAllValues = () => {
    onClearAllParams();
  };

  return (
    <table>
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={header} scope="col">
              <UserTableHeaderCell
                label={language[header]}
                ariaLabel={`${language.sort} ${header} ${sortDirection(header) === 'ascending' ? language.ascending : language.descending}`}
                iconName={
                  sortDirection(header) === 'ascending'
                    ? IconName.ArrowUp
                    : IconName.ArrowDown
                }
                onSortRows={() => {
                  sortFunction(header as 'username' | 'email' | 'role');
                }}
                onFilterRows={onChangeSearch}
                onClearAllValues={handleClearAllValues}
                value={values[header]}
                name={header}
                showClearAllBtn={header === ''}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredItems.map((item) => (
          <tr key={item.email}>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
