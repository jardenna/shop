import { useSearchParams } from 'react-router';
import FieldSet from './fieldset/FieldSet';
import Selectbox from './selectbox/Selectbox';
// import './_record-select.scss';

type PageCountOptions = {
  label: string;
  value: string;
};

type ProductCountSelectProps = {
  labelText: string;
  totalCount: number;
};

const ProductCountSelect = ({
  labelText,
  totalCount,
}: ProductCountSelectProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelectCount = (id: any) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('productsPerPage', id.value);
    setSearchParams(Object.fromEntries(newParams.entries()));
  };

  const pageCountOptions: PageCountOptions[] = [
    { value: '8', label: '8' },
    { value: '16', label: '16' },
    { value: totalCount.toString(), label: 'All' },
  ];

  return (
    <form className="product-navigation-form">
      <FieldSet legendText="displayOptions">
        <Selectbox
          name="productCount"
          options={pageCountOptions}
          id="productCount"
          onChange={handleSelectCount}
          labelText={labelText}
          defaultValue={pageCountOptions[0]}
          inputHasNoLabel
        />
      </FieldSet>
    </form>
  );
};

export default ProductCountSelect;
