"use client";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import PetForm from "./PetForm";
import { usePetHook } from "@/context/PetContextProvider";
import { deletePet } from "@/lib/actions";

type BtnProps = {
  actionType: "add" | "edit" | "delete";
  className?: string;
  onClick?: () => void;
};
const Btn = ({ actionType, className, onClick }: BtnProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { selectedPet } = usePetHook();

  if (actionType === "delete") {
    return (
      <Button variant="destructive" onClick={onClick}>
        Checkout{" "}
      </Button>
    );
  }
  if (actionType === "add" || actionType === "edit") {
    return (
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          {actionType === "add" ? (
            <Button size="icon" className={className}>
              <PlusIcon className="w-6 h-6" />
            </Button>
          ) : (
            <Button variant="secondary">Edit </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "add" ? "Add a new pet" : "Edit pet"}
            </DialogTitle>
          </DialogHeader>
          <PetForm
            selectedPet={selectedPet}
            actionType={actionType}
            onFormClose={() => setIsFormOpen(false)}
          />
          {/* <AddEditForm
          typeOfBtn={typeOfBtn}
          onFormClose={() => setIsFormOpen(false)}
        /> */}
        </DialogContent>
      </Dialog>
    );
  }
};

export default Btn;
