import { ErrorBoundary } from 'react-error-boundary';
import Button from '../components/Button';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useLanguage } from '../features/language/useLanguage';

interface LogoutProps {
  onLogout: () => void;
  onReset: () => void;
}

const Logout = ({ onReset, onLogout }: LogoutProps) => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onReset={onReset}>
      {currentUser && (
        <p>
          {language.welcome} {currentUser.username}
        </p>
      )}
      <Button onClick={onLogout}>{language.logout}</Button>
    </ErrorBoundary>
  );
};

export default Logout;
