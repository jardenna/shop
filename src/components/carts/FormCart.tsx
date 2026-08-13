import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../ErrorBoundaryFallback';
import FieldSet from '../fieldset/FieldSet';

type FormCartProps = {
  children: ReactNode;
  legendText: string;
  onReset: () => void;
};

const FormCart = ({ children, legendText, onReset }: FormCartProps) => (
  <div className="form-cart">
    <FieldSet legendText={legendText}>
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={onReset}
      >
        {children}
      </ErrorBoundary>
    </FieldSet>
  </div>
);

export default FormCart;
