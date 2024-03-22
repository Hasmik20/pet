"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { usePetHook } from "@/context/PetContextProvider";

import { PetTypes } from "@prisma/client";
import { PetOmitType } from "@/lib/types";
import BtnForm from "./BtnForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TUseForm, petFormSchema } from "@/lib/zodSchema";

type PetFormProps = {
  actionType: "add" | "edit";
  selectedPet?: PetTypes;
  onFormClose: () => void;
  onClick?: () => void;
};

const PetForm = ({
  actionType,
  onFormClose,
  onClick,
  selectedPet,
}: PetFormProps) => {
  const { addPetsHandler, editPetHandler } = usePetHook();

  const {
    trigger,
    register,
    getValues,

    formState: { errors, isSubmitted },
  } = useForm<TUseForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues:
      actionType === "edit"
        ? {
            name: selectedPet?.name,
            ownerName: selectedPet?.ownerName,
            age: selectedPet?.age,
            imageUrl: selectedPet?.imageUrl,
            notes: selectedPet?.notes,
          }
        : undefined,
  });

  return (
    <form
      className="flex flex-col"
      action={async (formData) => {
        const result = await trigger();
        if (!result) return;

        // const newPet: PetOmitType = {
        //   name: formData.get("name") as string,
        //   ownerName: formData.get("ownerName") as string,
        //   imageUrl: formData.get("imageUrl") as string,
        //   age: Number(formData.get("age")),
        //   notes: formData.get("notes") as string,
        // };
        const newPet = getValues();
        newPet.imageUrl =
          newPet.imageUrl ||
          "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=100&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        if (actionType === "add") {
          await addPetsHandler(newPet);
        } else {
          await editPetHandler(selectedPet!.id, newPet);
        }
      }}
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name")}
            // type="text"
            // name="name"
            // defaultValue={selectedPet?.name}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="owner">Owner name</Label>
          <Input
            id="owner"
            {...register("ownerName")}
            // type="text"
            // name="owner"
            // defaultValue={selectedPet?.ownerName}
          />
          {errors.ownerName && (
            <p className="text-red-500">{errors.ownerName.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="img">Image</Label>
          <Input
            id="img"
            {...register("imageUrl")}
            placeholder="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=100&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            // type="text"
            // name="img"
            // defaultValue={selectedPet?.imageUrl}
          />
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            {...register("age")}
            // type="number"
            // name="age"
            // defaultValue={selectedPet?.age}
          />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            {...register("notes")}
            //  name="notes" defaultValue={selectedPet?.notes}
          />
          {errors.notes && (
            <p className="text-red-500">{errors.notes.message}</p>
          )}
        </div>
      </div>

      <BtnForm
        actionType={actionType}
        onFormClose={async () => {
          const result = await trigger();
          if (result) onFormClose();
        }}
      />
    </form>
  );
};

export default PetForm;
