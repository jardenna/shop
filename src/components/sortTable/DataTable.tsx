import { useState } from 'react';

interface Data {
  age: number;
  id: number;
  name: string;
  editingField?: keyof Data;
}

const initialData: Data[] = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
];

export default function DataTable() {
  const [data, setData] = useState(initialData);
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editingField, setEditingField] = useState<keyof Data | null>(null);
  const [values, setValues] = useState<Partial<Data>>({});

  const handleEdit = (id: number, field: keyof Data) => {
    setEditRowId(id);
    setEditingField(field);
    const row = data.find((item) => item.id === id);
    if (row) {
      setValues({ [field]: row[field] });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSave = (id: number, field: keyof Data) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: values[field] } : item,
      ),
    );
    setEditRowId(null);
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditingField(null);
    setValues({});
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                {editRowId === item.id && editingField === 'name' ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={values.name || ''}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleSave(item.id, 'name');
                      }}
                    >
                      Save
                    </button>
                    <button type="button" onClick={handleCancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {item.name}{' '}
                    <button
                      type="button"
                      onClick={() => {
                        handleEdit(item.id, 'name');
                      }}
                    >
                      Edit
                    </button>
                  </>
                )}
              </td>
              <td>
                {editRowId === item.id && editingField === 'age' ? (
                  <>
                    <input
                      type="number"
                      name="age"
                      value={values.age || ''}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleSave(item.id, 'age');
                      }}
                    >
                      Save
                    </button>
                    <button type="button" onClick={handleCancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {item.age}{' '}
                    <button
                      type="button"
                      onClick={() => {
                        handleEdit(item.id, 'age');
                      }}
                    >
                      Edit
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
