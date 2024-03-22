"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";

import image from "../../public/accets/pet.jpg";
import { usePetHook } from "@/context/PetContextProvider";
import { useSearchHook } from "@/context/SearchContextProvider";

const ListPets = () => {
  const { pets, selectedPetId, handelChangeSeLectedId } = usePetHook();
  const { text } = useSearchHook();

  // const filteredPets = pets.filter((pet) => pet.name.includes(text));

  return (
    <ul className="bg-gray-50 border-b border-black/[0.08] overflow-y-auto max-h-[400px]">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handelChangeSeLectedId(pet.id)}
            className="flex gap-4 items-center  w-full h-[70px] px-5 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 transition"
          >
            <Image
              src={pet.imageUrl}
              alt="pet"
              width={40}
              height={40}
              className={cn("rounded-full  object-cover h-[50px] w-[50px] ", {
                "bg-gray-100 ": selectedPetId === pet.id,
              })}
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ListPets;
