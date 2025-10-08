import { useEffect, useState } from 'react';

// Tracks success/failure state when a modal contains a form
const useSubmitStatus = (delay = 300) => {
  const [resultSuccess, setResultSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (!resultSuccess) {
      return;
    }

    const timer = setTimeout(() => {
      setResultSuccess(null);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [resultSuccess, delay]);

  return { resultSuccess, setResultSuccess };
};

export default useSubmitStatus;
