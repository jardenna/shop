import { FC, useState } from 'react';
import { useSearchParams } from 'react-router';
import { UserResponse } from '../../app/api/apiTypes';
import { BtnVariant } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import Button from '../Button';
import Input from '../formElements/Input';
import sortData from './utils';

const tableData: UserResponse[] = [
  {
    username: 'Helle',
    email: 'helle@mail.com',
    isAdmin: true,
    createdAt: '2025-03-04T14:08:11.632Z',
    updatedAt: '2025-03-25T13:12:10.175Z',
    role: 'admin',
    id: '67c7094be192fbb4ee3890c3',
  },
  {
    username: 'Steen',
    email: 'steen@mail.com',
    isAdmin: false,
    role: 'user',
    createdAt: '2025-03-21T15:25:32.038Z',
    updatedAt: '2025-03-21T16:14:18.217Z',
    id: '67dd84ec6ef559ec91f7080d',
  },
  {
    username: 'Helene K',
    email: 'helene@mail.com',
    isAdmin: false,
    role: 'employee',
    createdAt: '2025-03-21T15:34:37.694Z',
    updatedAt: '2025-03-26T07:46:24.987Z',
    id: '67dd870d5d44e490f0ae7de3',
  },
];

const SortTable: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [values, setValues] = useState<Partial<UserResponse>>({});
  const [editingField, setEditingField] = useState<keyof UserResponse | null>(
    null,
  );
  const [sortConfig, setSortConfig] = useState<{
    sortKey: keyof UserResponse;
    sortDirection: 'asc' | 'desc';
  } | null>(null);

  const filteredDataFromParams = Object.fromEntries(searchParams);
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>(
    filteredDataFromParams,
  );

  const handleEdit = (id: string, field: keyof UserResponse) => {
    setEditRowId(id);
    setEditingField(field);
    const row = tableData.find((item) => item.id === id);
    if (row) {
      setValues({ [field]: row[field] });
    }
  };

  const handleChange = (event: ChangeInputType) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSave = (id: string, field: keyof UserResponse) => {
    console.log(id, values[field], field);

    setEditRowId(null);
    setEditingField(null);
  };
  const handleCancel = () => {
    setEditRowId(null);
    setEditingField(null);
    setValues({});
  };

  const handleFilter = (event: ChangeInputType) => {
    const { name, value } = event.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
    setFilterValues({ ...filterValues, [name]: value });
  };

  const handleSort = (sortKey: keyof UserResponse) => {
    setSortConfig((prev) => {
      if (prev?.sortKey === sortKey && prev.sortDirection === 'asc') {
        return { sortKey, sortDirection: 'desc' };
      }
      return { sortKey, sortDirection: 'asc' };
    });
  };

  const sortedData = sortData(tableData, sortConfig);

  const filteredData = sortedData.filter((item) =>
    Object.entries(filterValues).every(([key, value]) =>
      value
        ? item[key as keyof UserResponse]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : true,
    ),
  );

  return (
    <table>
      <thead>
        <tr>
          <th
            onClick={() => {
              handleSort('username');
            }}
          >
            <Input
              type="search"
              id="username"
              name="username"
              onChange={handleFilter}
              value={filterValues.username || ''}
              labelText="Username"
            />
          </th>
          <th
            onClick={() => {
              handleSort('email');
            }}
          >
            <Input
              type="search"
              id="email"
              name="email"
              onChange={handleFilter}
              value={filterValues.email || ''}
              labelText="Email"
            />
          </th>
          <th
            onClick={() => {
              handleSort('role');
            }}
          >
            <Input
              type="search"
              id="role"
              name="role"
              onChange={handleFilter}
              value={filterValues.role || ''}
              labelText="Role"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map(({ id, username, email, role }) => (
          <tr key={id}>
            <td>
              {editRowId === id && editingField === 'username' ? (
                <div>
                  <Input
                    id="username"
                    name="username"
                    onChange={handleChange}
                    value={values.username || ''}
                    labelText="Username"
                  />
                  <Button variant={BtnVariant.Ghost} onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button
                    variant={BtnVariant.Ghost}
                    onClick={() => {
                      handleSave(id, 'username');
                    }}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <>
                  <span>{username}</span>
                  <Button
                    variant={BtnVariant.Ghost}
                    onClick={() => {
                      handleEdit(id, 'username');
                    }}
                  >
                    Edit
                  </Button>
                </>
              )}
            </td>
            <td>
              {editRowId === id && editingField === 'email' ? (
                <>
                  <Input
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email || ''}
                    labelText="Username"
                  />
                  <Button variant={BtnVariant.Ghost} onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button
                    variant={BtnVariant.Ghost}
                    onClick={() => {
                      handleSave(id, 'email');
                    }}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <span>{email}</span>
                  <Button
                    variant={BtnVariant.Ghost}
                    onClick={() => {
                      handleEdit(id, 'email');
                    }}
                  >
                    Edit
                  </Button>
                </>
              )}
            </td>
            <td>
              {editRowId === id && editingField === 'role' ? (
                <>
                  <Input
                    id="role"
                    name="role"
                    onChange={handleChange}
                    value={values.role || ''}
                    labelText="Role"
                  />
                  <Button variant={BtnVariant.Ghost} onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button
                    variant={BtnVariant.Ghost}
                    onClick={() => {
                      handleSave(id, 'role');
                    }}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <span>{role}</span>
                  <Button
                    variant={BtnVariant.Ghost}
                    onClick={() => {
                      handleEdit(id, 'role');
                    }}
                  >
                    Edit
                  </Button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortTable;
