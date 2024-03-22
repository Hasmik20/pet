"use client";
import React from "react";

import { usePetHook } from "@/context/PetContextProvider";

const Stat = () => {
  const { petsNumber } = usePetHook();
  return (
    <div className="text-center">
      <p className="font-semibold">{petsNumber}</p>
      <p className="opacity-50">Current guest</p>
    </div>
  );
};

export default Stat;
