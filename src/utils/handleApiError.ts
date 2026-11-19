import type { ToastTypes } from '../components/toast/toastConfig';

interface AddMessage {
  message: string;
  type: ToastTypes;
}

interface AddToastCallback {
  (message: AddMessage): void;
}

// Global error handler for try/catch and manual API responses
export const handleApiError = (
  error: unknown,
  onAddToast: AddToastCallback,
): void => {
  // If a simple string or message object is passed
  if (typeof error === 'string') {
    onAddToast({
      type: 'error',
      message: error,
    });
    return;
  }

  if (typeof error === 'object' && error !== null) {
    const errorData = error as Record<string, unknown>;

    if (errorData.message && !errorData.status) {
      onAddToast({
        type: 'error',
        message:
          typeof errorData.message === 'string'
            ? errorData.message
            : 'An error occurred',
      });
      return;
    }

    const status = errorData.status;

    // Network error or no status → treat as critical
    if (!status || status === 'FETCH_ERROR') {
      throw new Error(
        typeof errorData.error === 'string'
          ? errorData.error
          : 'A network error occurred',
      );
    }

    // Expected errors (< 500) → handled locally
    if (typeof status === 'number' && status < 500) {
      const data = errorData.data;

      const dataMessage =
        typeof data === 'object' &&
        data !== null &&
        'message' in data &&
        typeof data.message === 'string'
          ? data.message
          : 'An error occurred';

      onAddToast({
        type: 'error',
        message: dataMessage,
      });
      return;
    }

    // Critical errors (>= 500) → bubble to ErrorBoundary
    throw new Error(
      typeof errorData.message === 'string'
        ? errorData.message
        : 'An unexpected error occurred',
    );
  }

  // Network error or unrecognized value → treat as critical
  throw new Error('An unexpected error occurred');
};
