import React from "react";

const VerticalContainer = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-screen-sm w-full h-full bg-black">
        {children}
      </div>
    </div>
  );
};

export default VerticalContainer;
