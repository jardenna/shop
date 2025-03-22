import { useSearchParams } from 'react-router';
import { ChangeInputType } from '../../types/types';
import { tableData, tableHeaders } from './tableData';
import useFilter from './useFilter';
import useSorting from './useSorting';

const UserTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const valuesFromParams = Object.fromEntries(searchParams);

  const initialStateUser = {
    username: valuesFromParams.username || '',
    email: valuesFromParams.email || '',
    role: valuesFromParams.role || '',
  };

  const { sortedItems, sortFunction, sortClassName, onClearAllParams } =
    useSorting(tableData);

  const test = {
    initialState: initialStateUser,
    items: sortedItems,
  };

  const { onChange, values, filteredItems } = useFilter(test);

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

  const handleClear = () => {
    onClearAllParams();
  };

  return (
    <div>
      <button onClick={handleClear} type="button">
        clear
      </button>
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header}
                onClick={() => {
                  sortFunction(header as 'username' | 'email' | 'role');
                }}
              >
                {header}{' '}
                {sortClassName(header as 'username' | 'email' | 'role')}
                <div>
                  <form className="search">
                    <div className="input-wrapper">
                      <input
                        type="search"
                        placeholder="search"
                        onChange={onChangeSearch}
                        value={values[header]}
                        name={header}
                      />
                    </div>
                  </form>
                </div>
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
    </div>
  );
};

export default UserTable;
