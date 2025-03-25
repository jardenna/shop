import { FC, ReactNode } from 'react';
import useLanguage from '../../features/language/useLanguage';
import VisuallyHidden from '../VisuallyHidden';
import './_table.scss';

interface TableProps {
  children: ReactNode;
  tableCaption: string;
  isLoading?: boolean;
}

const Table: FC<TableProps> = ({ children, tableCaption, isLoading }) => {
  const { language } = useLanguage();

  return (
    <div className="fixed-table">
      <table aria-label={isLoading ? language.loading : undefined}>
        <VisuallyHidden as="caption">{tableCaption}</VisuallyHidden>
        {children}
      </table>
    </div>
  );
};

export default Table;
