"use client";

import { createContext, useContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

import { PetTypes } from "@prisma/client";
import { PetOmitType } from "@/lib/types";
import { addPets, deletePet, editPet } from "@/lib/actions";

type Props = {
  children: React.ReactNode;
  pets: PetTypes[];
};

type PetContextType = {
  pets: PetTypes[];
  selectedPetId: number | null;
  petsNumber: number;
  selectedPet?: PetTypes;
  handelChangeSeLectedId: (id: number) => void;
  addPetsHandler: (newPet: PetOmitType) => Promise<void>;
  editPetHandler: (id: number, newPet: PetOmitType) => Promise<void>;
  deletePetHandler: (id: number) => Promise<void>;
};

const PetContext = createContext<PetContextType | null>(null);

const PetContextProvider = ({ children, pets }: Props) => {
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [optimisticState, addOptimistic] = useOptimistic(
    pets,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { ...payload, id: Math.random() }];
        case "edit":
          return state.map((item) => {
            if (item.id === payload.id) {
              return { ...item, ...payload.newPets };
            }
            return item;
          });
        case "delete":
          return state.filter((item) => item.id !== payload.id);
        default:
          return state;
      }
    }
  );

  //   derived
  const selectedPet = optimisticState.find((pet) => pet.id === selectedPetId);
  const petsNumber = optimisticState.length;

  //  ACTIONS
  const handelChangeSeLectedId = (id: number) => {
    setSelectedPetId(id);
  };

  // addPets
  const addPetsHandler = async (newPets: PetOmitType) => {
    addOptimistic({ action: "add", payload: { newPets } });

    const error = await addPets(newPets);
    if (error) {
      toast.warning(error.message);
      return;
    }
    toast.success("You added  pet!");
  };
  // editPet
  const editPetHandler = async (id: number, newPets: PetOmitType) => {
    addOptimistic({ action: "edit", payload: { id, newPets } });

    const error = await editPet(id, newPets);
    if (error) {
      toast.warning(error.message);
      return;
    }

    toast.success("You edited  pet!");
  };

  // delete
  const deletePetHandler = async (id: number) => {
    addOptimistic({ action: "delete", payload: { id } });

    const error = await deletePet(id);
    if (error) {
      toast.warning(error.message);
      return;
    }
    toast.success("You successfully remove the pet");
  };
  return (
    <PetContext.Provider
      value={{
        pets: optimisticState,
        selectedPetId,
        selectedPet,
        petsNumber,
        handelChangeSeLectedId,
        addPetsHandler,
        editPetHandler,
        deletePetHandler,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;

export const usePetHook = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error("the content is not in PetContextProvider");
  }
  return context;
};
