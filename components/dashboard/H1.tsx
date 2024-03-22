import React from "react";

const H1 = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="text-3xl text-white mt-3 mb-2 font-semibold">{children}</h1>
  );
};

export default H1;
