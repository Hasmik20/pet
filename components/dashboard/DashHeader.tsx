import React from "react";
import H1 from "./H1";
import Stat from "./Stat";

const DashHeader = () => {
  return (
    <section className="flex items-center justify-between text-white py-4">
      <div>
        <H1>PetSoft</H1>
        <p className=" text-2xl opacity-50">
          Manage your pet daycare with ease
        </p>
      </div>
      <Stat />
    </section>
  );
};

export default DashHeader;
