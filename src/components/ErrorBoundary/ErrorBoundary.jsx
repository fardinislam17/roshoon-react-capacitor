import React, { useState, ReactNode, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  // Error handling function for the boundary
  const handleError = (error) => {
    setHasError(true);
    setError(error);
    console.error('Error caught by ErrorBoundary:', error);
  };

  // Reset error when children change, useful when the error is fixed
  useEffect(() => {
    if (hasError) {
      setHasError(false);
      setError(null);
    }
  }, [children]);

  // Error boundary logic using event listener for runtime errors
  useEffect(() => {
    const handleWindowError = (event) => {
      handleError(event.error);
    };

    window.addEventListener('error', handleWindowError);

    return () => {
      window.removeEventListener('error', handleWindowError);
    };
  }, []);

  if (hasError) {
    return (
      <div>
        <h2>Something went wrong.</h2>
        <p>{error?.message}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
