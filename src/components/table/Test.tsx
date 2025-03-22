import { useSearchParams } from 'react-router';
import { ChangeInputType } from '../../types/types';
import useFilter from './useFilter';
import useSorting from './useSorting';

type Item = {
  id: number;
  name: string;
  age: string;
};

function Test() {
  const initialItems: Item[] = [
    { id: 1, name: 'Alice', age: '25' },
    { id: 2, name: 'Bob', age: '30' },
    { id: 3, name: 'Charlie', age: '20' },
  ];
  const [searchParams, setSearchParams] = useSearchParams();

  const valuesFromParams = Object.fromEntries(searchParams);

  const initialState = {
    name: valuesFromParams.name || '',
    age: valuesFromParams.age || '',
  };

  const { sortedItems, sortFunction, sortClassName, onClearAllParams } =
    useSorting(initialItems);

  const test = {
    initialState,
    items: sortedItems,
  };

  const { onChange, values, filteredItems } = useFilter(test);

  const onChangeSearch = (event: ChangeInputType) => {
    const { name, value } = event.target;

    searchParams.set(name, value);
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
                sortFunction('name');
              }}
            >
              Name {sortClassName('name')}
              <form className="search">
                <div className="input-wrapper">
                  <div>
                    <input
                      type="search"
                      placeholder="search"
                      onChange={onChangeSearch}
                      value={values.name}
                      name="name"
                    />
                  </div>
                </div>
              </form>
            </th>
            <th
              onClick={() => {
                sortFunction('age');
              }}
            >
              Age {sortClassName('age')}
              <form className="search">
                <div className="input-wrapper">
                  <div>
                    <input
                      type="search"
                      placeholder="search"
                      onChange={onChangeSearch}
                      value={values.age}
                      name="age"
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
              <td>{item.name}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Test;
