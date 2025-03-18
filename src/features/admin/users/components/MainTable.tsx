import { FC, memo } from 'react';
import { Form } from 'react-router';
import { UserResponse } from '../../../../app/api/apiTypes';
import Input from '../../../../components/formElements/Input';
import IconBtn from '../../../../components/IconBtn';
import Table from '../../../../components/table/Table';
import TableGridList from '../../../../components/TableGridList';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { IconName } from '../../../../types/enums';
import useLanguage from '../../../language/useLanguage';

interface MainTableProps {
  isLoading: boolean;
  isPending: boolean;
  showForm: number | null;
  tableCaption: string;
  tableData: UserResponse[];
  tableHeaders: string[];
  value: string;
  onChange?: any;
  onShowUpdateRole: (id: number) => void;
}

const MainTable: FC<MainTableProps> = ({
  isLoading,
  isPending,
  tableCaption,
  tableData,
  tableHeaders,
  onChange,
  value,
  onShowUpdateRole,
  showForm,
}) => {
  const { language } = useLanguage();
  const [padding, setPadding] = useLocalStorage('padding', 12);

  const handlePadding = (paddingStyle: number) => {
    setPadding(paddingStyle);
  };

  const style = {
    paddingTop: padding,
    paddingBottom: padding,
  };

  const tableGridIconList = [
    { padding: 4, iconName: IconName.GridSmall, title: language.gridSmall },
    { padding: 12, iconName: IconName.Grid, title: language.grid },
    { padding: 20, iconName: IconName.GridLarge, title: language.gridLarge },
  ];
  console.log(showForm);

  return (
    <>
      <div className="table-actions">
        <TableGridList
          onSetPadding={handlePadding}
          tableGridIconList={tableGridIconList}
          isActive={padding}
        />
      </div>

      <Table isLoading={isLoading} tableCaption={tableCaption}>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th scope="col" style={style} key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        {tableData.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={6} className="no-records-table-field">
                <span className="no-record-info"> {language.noAlbumFound}</span>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {!isPending ? (
              tableData.map((data) => (
                <tr key={data.id}>
                  <td>{data.username}</td>
                  <td>
                    <a href={`mailto:${data.email}`}>{data.email}</a>
                  </td>
                  <td className="user-role-cell">
                    <span className="role">{data.role}</span>
                    <IconBtn
                      iconName={IconName.Edit}
                      className="danger"
                      title={language.trashCan}
                      ariaLabel={language.deleteCustomer}
                      onClick={() => {
                        onShowUpdateRole(data.id);
                      }}
                    />
                    {showForm === data.id && (
                      <>
                        <Form>
                          <Input
                            name="username"
                            id="username"
                            value={value}
                            labelText={language.username}
                            inputHasNoLabel
                            onChange={onChange}
                          />
                        </Form>
                        <IconBtn
                          iconName={IconName.Trash}
                          className="danger"
                          title={language.trashCan}
                          ariaLabel={language.deleteCustomer}
                          onClick={() => {
                            console.log('save');
                          }}
                        />
                      </>
                    )}
                  </td>

                  <td className="delete-user-cell">
                    <IconBtn
                      iconName={IconName.Trash}
                      className="danger"
                      title={language.trashCan}
                      ariaLabel={language.deleteCustomer}
                      onClick={() => {
                        console.log(122);
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="no-records-table-field">
                  skeleton
                  {/* <SkeletonList
                    count={8}
                    className="column"
                    variant="secondary"
                  /> */}
                </td>
              </tr>
            )}
          </tbody>
        )}
      </Table>
    </>
  );
};

export default memo(MainTable);
