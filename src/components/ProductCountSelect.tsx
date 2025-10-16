import { useLayoutEffect } from 'react';
import FieldSet from './fieldset/FieldSet';
import Selectbox from './selectbox/Selectbox';

export type PageCountOptions = {
  label: string;
  value: string;
  isDisabled?: boolean;
};

type ProductCountSelectProps = {
  defaultValue: PageCountOptions;
  headingRef: React.RefObject<HTMLElement | null>;
  labelText: string;
  legendText: string;
  options: PageCountOptions[];
  onSelectCount: (option: PageCountOptions) => void;
};

const ProductCountSelect = ({
  labelText,
  options,
  defaultValue,
  legendText,
  onSelectCount,
  headingRef,
}: ProductCountSelectProps) => {
  useLayoutEffect(() => {
    headingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [options]);

  return (
    <form className="product-navigation-form">
      <FieldSet legendText={legendText}>
        <Selectbox
          name="productCount"
          options={options}
          id="productCount"
          onChange={onSelectCount}
          labelText={labelText}
          defaultValue={defaultValue}
          inputHasNoLabel
          isOptionDisabled={(option: PageCountOptions) => !!option.isDisabled}
        />
      </FieldSet>
    </form>
  );
};
export default ProductCountSelect;
