import { ToastTypes } from '../components/toast/toastConfig';

interface AddMessage {
  message: string;
  type: ToastTypes;
}

interface AddMessagePopupFn {
  (message: AddMessage): void;
}

// Global error handler for try/catch and manual API responses
export const handleApiError = (
  error: any,
  onAddToast: AddMessagePopupFn,
): void => {
  // If a simple string or message object is passed
  if (typeof error === 'string') {
    onAddToast({
      type: 'error',
      message: error,
    });
    return;
  }

  if (error?.message && !error.status) {
    onAddToast({
      type: 'error',
      message: error.message,
    });
    return;
  }

  const status = error?.status;

  // Network error or no status → treat as critical
  if (!status || status === 'FETCH_ERROR') {
    throw error;
  }

  // Expected errors (< 500) → handled locally
  if (status < 500) {
    onAddToast({
      type: 'error',
      message: error.data?.message ?? 'An error occurred',
    });
    return;
  }

  // Critical errors (>= 500) → bubble to ErrorBoundary
  throw error;
};
