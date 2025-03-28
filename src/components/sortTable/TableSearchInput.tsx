import { FC, FormEvent, useRef, useState } from 'react';
import useLanguage from '../../features/language/useLanguage';
import useClickOutside from '../../hooks/useClickOutside';
import { IconName } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import Input from '../formElements/Input';
import IconBtn from '../IconBtn';
import VisuallyHidden from '../VisuallyHidden';

interface TableSearchInputProps {
  label: string;
  title: string;
  value: string;
  onFilterRows: (event: ChangeInputType) => void;
}

const TableSearchInput: FC<TableSearchInputProps> = ({
  title,
  value,
  onFilterRows,
  label,
}) => {
  const { language } = useLanguage();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const text = `${language.filter} ${language[title]}`;
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  useClickOutside(searchInputRef, () => {
    setShowSearchInput(false);
  });

  return (
    <div className="table-search-input">
      <IconBtn
        title={language.filterRow}
        ariaLabel={`${language.filter} ${label}`}
        onClick={handleSearchInput}
        iconName={IconName.Filter}
      />
      {value && (
        <>
          <VisuallyHidden>{language.filtersApplied}</VisuallyHidden>
          <span className="dot" aria-hidden />
        </>
      )}
      {showSearchInput && (
        <form
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
          }}
        >
          <Input
            type="search"
            name={title}
            id={title}
            placeholder={text}
            value={value}
            onChange={onFilterRows}
            labelText={text}
            inputHasNoLabel
            ref={searchInputRef}
            autoFocus
          />
        </form>
      )}
    </div>
  );
};

export default TableSearchInput;
