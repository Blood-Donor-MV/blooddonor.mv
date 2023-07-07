import React from 'react';

type LoadingContainerProps = {
  children?: React.ReactElement | null;
  error?: Error;
  retry: () => void;
  loadingMessage?: string;
  loading?: boolean;
};

const LoadingContainer = ({
  children,
  error,
  retry,
  loadingMessage = 'Loading...',
  loading = false,
}: LoadingContainerProps) => {
  if (error && loading) {
    return (
      <div>
        <div>{loadingMessage}</div>
      </div>
    );
  }

  if (error && !children) {
    return (
      <button onClick={retry} className="text-red-700">error.message</button>
    );
  }

  if (children) {
    return children;
  }

  return (
    <div>
      <div>{loadingMessage}</div>
    </div>
  );
};

export default LoadingContainer;
