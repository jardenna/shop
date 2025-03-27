import { useSearchParams } from 'react-router';

const SortableTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const data = [
    { id: 1, name: 'Alice', age: 25, city: 'New York' },
    { id: 2, name: 'Bob', age: 30, city: 'Los Angeles' },
    { id: 3, name: 'Charlie', age: 35, city: 'Chicago' },
  ];

  const sortField = searchParams.get('sortField') || 'name';
  const sortOrder = searchParams.get('sortOrder') || 'asc';
  const filters = {
    name: searchParams.get('name') || '',
    age: searchParams.get('age') || '',
    city: searchParams.get('city') || '',
  };

  const handleSort = (field: string) => {
    const newOrder =
      sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sortField: field,
      sortOrder: newOrder,
    });
  };

  const handleFilter = (field: string, value: string) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      [field]: value,
    });
  };
  const handleClearAll = () => {
    setSearchParams('');
  };
  const filteredData = data.filter((item) =>
    Object.keys(filters).every(
      (key) =>
        filters[key as keyof typeof filters] === '' ||
        item[key as keyof typeof item]
          .toString()
          .toLowerCase()
          .includes(filters[key as keyof typeof filters].toLowerCase()),
    ),
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortField as keyof typeof a] < b[sortField as keyof typeof b]) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (a[sortField as keyof typeof a] > b[sortField as keyof typeof b]) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      <button onClick={handleClearAll} type="button">
        clear
      </button>
      <table>
        <thead>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => {
                  handleSort('name');
                }}
              >
                Name
              </button>
              <input
                type="text"
                value={filters.name}
                onChange={(e) => {
                  handleFilter('name', e.target.value);
                }}
                placeholder="Filter by name"
              />
            </th>
            <th>
              <button
                type="button"
                onClick={() => {
                  handleSort('age');
                }}
              >
                Age
              </button>
              <input
                type="text"
                value={filters.age}
                onChange={(e) => {
                  handleFilter('age', e.target.value);
                }}
                placeholder="Filter by age"
              />
            </th>
            <th>
              <button
                type="button"
                onClick={() => {
                  handleSort('city');
                }}
              >
                City
              </button>
              <input
                type="text"
                value={filters.city}
                onChange={(e) => {
                  handleFilter('city', e.target.value);
                }}
                placeholder="Filter by city"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortableTable;
