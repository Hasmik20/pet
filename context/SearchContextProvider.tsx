"use client";

import { createContext, useContext, useState } from "react";
import { usePetHook } from "./PetContextProvider";
import { PetTypes } from "@prisma/client";

type Props = {
  children: React.ReactNode;
};

type SearchContextType = {
  text: string;
  changeHandler: (text: string) => void;
};
const SearchContext = createContext<SearchContextType | null>(null);

const SearchContextProvider = ({ children }: Props) => {
  const [text, setText] = useState("");

  const changeHandler = (text: string) => {
    setText(text);
  };
  return (
    <SearchContext.Provider
      value={{
        text,
        changeHandler,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;

export const useSearchHook = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("is not in searchProvider");
  }
  return context;
};
