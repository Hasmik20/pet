"use client";
import { useSearchHook } from "@/context/SearchContextProvider";
import React, { useState } from "react";

const SearchComp = () => {
  const { text, changeHandler } = useSearchHook();

  return (
    <form className="w-full h-full">
      <input
        className="w-full h-full bg-white/50 rounded-md px-4 outline-none focus:bg-white/50 hover:bg-white/30 transition"
        placeholder="Search pet..."
        type="search"
        value={text}
        onChange={(e) => changeHandler(e.target.value)}
      />
    </form>
  );
};

export default SearchComp;
