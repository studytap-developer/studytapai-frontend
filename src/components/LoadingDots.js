import React from "react";

const LoadingDots = () => {
  return (
    <div className="flex gap-1">
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
    </div>
  );
};

export default LoadingDots;
