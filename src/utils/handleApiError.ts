import type { MessagePopupWithoutId } from '../features/messagePopupSlice';

type AddMessagePopupFn = ({
  message,
  messagePopupType,
  componentType,
}: MessagePopupWithoutId) => void;

// Global error handler for try/catch
const handleApiError = (error: any, onAddMessagePopup: AddMessagePopupFn) => {
  const status = error?.status;

  // Network error or no status → treat as critical
  if (!status || status === 'FETCH_ERROR') {
    throw error;
  }

  // Expected errors (< 500) → handled locally
  if (status < 500) {
    onAddMessagePopup({
      messagePopupType: 'error',
      message: error.data?.message ?? 'An error occurred',
      componentType: 'notification',
    });
    return;
  }

  // Critical errors (>= 500) → bubble to ErrorBoundary
  throw error;
};

export default handleApiError;
