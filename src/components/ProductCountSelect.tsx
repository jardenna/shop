import { useLayoutEffect } from 'react';
import type { RefElementType } from '../types/types';
import FieldSet from './fieldset/FieldSet';
import Selectbox from './selectbox/Selectbox';

export type PageCountOptions = {
  label: string;
  value: string;
};

type ProductCountSelectProps = {
  defaultValue: PageCountOptions;
  headingRef: RefElementType;
  labelText: string;
  legendText: string;
  options: PageCountOptions[];
  isOptionDisabled?: (option: { value: string }) => boolean;
  onSelectCount: (option: PageCountOptions) => void;
};

const ProductCountSelect = ({
  labelText,
  options,
  defaultValue,
  legendText,
  onSelectCount,
  headingRef,
  isOptionDisabled,
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
          isOptionDisabled={isOptionDisabled}
        />
      </FieldSet>
    </form>
  );
};

export default ProductCountSelect;
