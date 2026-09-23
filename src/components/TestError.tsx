import { useState } from 'react';

// This comp should only be used to test errors
const TestError = () => {
  const [shouldThrow, setShouldThrow] = useState(true);

  if (shouldThrow) {
    throw new Error('Test error');
  }

  return (
    <button
      type="button"
      onClick={() => {
        setShouldThrow(false);
      }}
    >
      Success
    </button>
  );
};

export default TestError;
