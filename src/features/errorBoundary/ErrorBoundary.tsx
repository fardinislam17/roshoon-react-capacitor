import React, { useState, ReactNode, useEffect } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Error handling function for the boundary
  const handleError = (error: Error) => {
    setHasError(true);
    setError(error);
    console.error("Error caught by ErrorBoundary:", error);
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
    const handleWindowError = (event: ErrorEvent) => {
      handleError(event.error);
    };

    window.addEventListener("error", handleWindowError);

    return () => {
      window.removeEventListener("error", handleWindowError);
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
