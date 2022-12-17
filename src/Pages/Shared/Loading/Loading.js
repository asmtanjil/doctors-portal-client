import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <span>L</span>
      <span className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
        <span className="visually-hidden text-error">...</span>
      </span>
      <span>ading</span>
    </div>
  );
};

export default Loading;