import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-8xl animation-rotate">⌛</div>
    </div>
  );

  //   <div><div className="text-3xl font-bold underline text-center">Loading... ⌛</div></div>
};

export default LoadingScreen;
