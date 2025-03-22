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

  const initialState = {
    name: '',
    age: '',
  };

  const { sortedItems, sortFunction, sortClassName, onClearAll } =
    useSorting(initialItems);

  const test = {
    initialState,
    items: sortedItems,
  };

  const { onChange, values, filteredItems } = useFilter(test);

  const handleClear = () => {
    onClearAll();
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
                      onChange={onChange}
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
                      onChange={onChange}
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
