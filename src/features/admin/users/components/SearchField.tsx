import { FC, useRef, useState } from 'react';
import Input from '../../../../components/formElements/Input';
import IconBtn from '../../../../components/IconBtn';
import VisuallyHidden from '../../../../components/VisuallyHidden';
import useClickOutside from '../../../../hooks/useClickOutside';
import { IconName } from '../../../../types/enums';
import { ChangeInputType } from '../../../../types/types';
import useLanguage from '../../../language/useLanguage';

interface SearchFieldProps {
  label: string;
  title: string;
  value: string;
  onFilterRows: (e: ChangeInputType) => void;
}

const SearchField: FC<SearchFieldProps> = ({
  title,
  value,
  onFilterRows,
  label,
}) => {
  const { language } = useLanguage();
  const SearchFieldRef = useRef<HTMLInputElement>(null);
  const text = `${language.filter} ${language[title]}`;
  const [showSearchsField, setShowSearchsField] = useState(false);

  const handleSearchField = () => {
    setShowSearchsField(!showSearchsField);
  };

  useClickOutside(SearchFieldRef, () => {
    setShowSearchsField(false);
  });

  return (
    <div className="position-relative">
      <IconBtn
        title={language.filterRow}
        ariaLabel={`${language.filter} ${label}`}
        onClick={handleSearchField}
        iconName={IconName.Filter}
      />
      {value && (
        <>
          <VisuallyHidden>{language.filtersApplied}</VisuallyHidden>
          <span className="dot" aria-hidden />
        </>
      )}
      {showSearchsField && (
        <Input
          type="search"
          name={title}
          id={title}
          placeholder={text}
          value={value}
          onChange={onFilterRows}
          labelText={text}
          inputHasNoLabel
          ref={SearchFieldRef}
          autoFocus
        />
      )}
    </div>
  );
};

export default SearchField;
