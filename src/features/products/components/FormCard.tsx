import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import FieldSet from '../../../components/fieldset/FieldSet';

type FormCardProps = {
  children: ReactNode;
  legendText: string;
  onReset: () => void;
};

const FormCard = ({ children, legendText, onReset }: FormCardProps) => (
  <div className="form-card">
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

export default FormCard;
