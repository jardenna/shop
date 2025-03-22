import { useSearchParams } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import IconBtn from '../IconBtn';
import { tableData, tableHeaders } from './tableData';
import useFilter from './useFilter';
import useSorting from './useSorting';

const UserTable = () => {
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

  const test = {
    initialState,
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
              <th key={header}>
                {header !== '' && (
                  <div>
                    <span>{header}</span>
                    <IconBtn
                      onClick={() => {
                        sortFunction(header as 'username' | 'email' | 'role');
                      }}
                      ariaLabel={`${language.sort} ${header} ${sortDirection(header) === 'ascending' ? language.ascending : language.descending}`}
                      iconName={
                        sortDirection(header) === 'ascending'
                          ? IconName.ArrowUp
                          : IconName.ArrowDown
                      }
                      title={language.sort}
                    />

                    <form>
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
                )}
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
