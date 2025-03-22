import { useSearchParams } from 'react-router';
import { ChangeInputType } from '../../types/types';
import { tableData } from './tableData';
import useFilter from './useFilter';
import useSorting from './useSorting';

type Item = {
  username: string;
  email: string;
  role: string;
};

interface Test {
  initialState: Item;
  items: any;
}

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

  const test: Test = {
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
            <th
              onClick={() => {
                sortFunction('username');
              }}
            >
              User name {sortClassName('username')}
              <form className="search">
                <div className="input-wrapper">
                  <div>
                    <input
                      type="search"
                      placeholder="search"
                      onChange={onChangeSearch}
                      value={values.username}
                      name="username"
                    />
                  </div>
                </div>
              </form>
            </th>
            <th
              onClick={() => {
                sortFunction('email');
              }}
            >
              email {sortClassName('email')}
              <form className="search">
                <div className="input-wrapper">
                  <div>
                    <input
                      type="search"
                      placeholder="search"
                      onChange={onChangeSearch}
                      value={values.email}
                      name="email"
                    />
                  </div>
                </div>
              </form>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr key={index}>
              <td>{item.username}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
