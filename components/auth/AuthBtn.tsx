"use client";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

type AuthBtnProps = {
  type: "signUp" | "login";
};

const AuthBtn = ({ type }: AuthBtnProps) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="my-2">
      {type === "signUp" ? "Sign Up" : "LogIn"}
    </Button>
  );
};

export default AuthBtn;
