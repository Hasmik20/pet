"use client";
import Image from "next/image";

import { usePetHook } from "@/context/PetContextProvider";
import Btn from "./Btn";

const DetailsPet = () => {
  const { selectedPet, deletePetHandler } = usePetHook();

  return (
    <section className="flex flex-col  w-full h-full bg-gray-100  ">
      {!selectedPet ? (
        <EmptyDiv />
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-center px-4 py-3 bg-white border-b border-light">
            <Image
              src={selectedPet?.imageUrl}
              alt={selectedPet?.name}
              width={45}
              height={45}
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <h2 className="text-2xl font-semibold ml-5">{selectedPet?.name}</h2>
            <div className="mx-auto md:mx-0 md:ml-auto  space-x-2 ">
              <Btn actionType="edit" />
              <Btn
                actionType="delete"
                onClick={async () => {
                  await deletePetHandler(selectedPet.id);
                }}
              />
            </div>

            {/* <div className="mx-auto md:mx-0 md:ml-auto  space-x-2 ">
      <CrudBtn typeOfBtn="edit">Edit</CrudBtn>
      <CrudBtn
        onClick={() => handelCheckoutPet(selectedPet.id)}
        typeOfBtn="checkout"
      >
        Checkout
      </CrudBtn>
    </div> */}
          </div>
          <section className=" flex items-center justify-around py-10 text-center">
            <div>
              <h3 className=" text-gray-600">Owner name</h3>
              <p className="text-gray-700 uppercase mt-1">
                {selectedPet?.ownerName}
              </p>
            </div>
            <div>
              <h3 className=" text-gray-600">Age</h3>
              <p className="text-gray-700  mt-1">{selectedPet?.age}</p>
            </div>
          </section>
          <section className="py-8 px-6 mb-9 mx-8 bg-white grow rounded-md border border-light">
            {selectedPet?.notes}
          </section>
        </>
      )}
    </section>
  );
};

export default DetailsPet;

const EmptyDiv = () => {
  return (
    <p className="text-2xl font-semibold self-center my-auto">
      No pet selected
    </p>
  );
};
