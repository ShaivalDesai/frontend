// ErrorText.tsx
import React from 'react';

interface ErrorTextProps {
  error: string | undefined; // Define the type for the error prop
}

const ErrorText: React.FC<ErrorTextProps> = ({ error }) => {
  return (
    <div style={{ color: "red" }}>
      {error && error}
    </div>
  );
};

export default ErrorText;
