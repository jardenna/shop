import Selectbox from '../selectbox/Selectbox';
// import './_record-select.scss';

type PageCountOptions = {
  label: string;
  value: string;
};

type ProductCountSelectProps = {
  labelText: string;
  totalCount: number;
  onSelectCount: (value: PageCountOptions) => void;
};
const ProductCountSelect = ({
  onSelectCount,
  labelText,
  totalCount,
}: ProductCountSelectProps) => {
  const pageCountOptions: PageCountOptions[] = [
    { value: '8', label: '8' },
    { value: '20', label: '20' },
    { value: '50', label: '50' },
    { value: totalCount.toString(), label: 'All' },
  ];
  return (
    <div className="record-select-container">
      <form>
        <Selectbox
          name="limit"
          options={pageCountOptions}
          id="limit"
          onChange={onSelectCount}
          labelText={labelText}
          inputHasNoLabel
          defaultValue={pageCountOptions[0]}
        />
      </form>
    </div>
  );
};

export default ProductCountSelect;
