import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

type BtnProps = {
  actionType: "edit" | "add";
  onFormClose: () => void;
};
const BtnForm = ({ onFormClose, actionType }: BtnProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="mt-3 self-end"
      onClick={onFormClose}
      disabled={pending}
    >
      {actionType === "add" ? "Add" : "Edit"}
      {pending && "Submitting..."}
    </Button>
  );
};

export default BtnForm;
