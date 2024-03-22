"use client";
import { useFormState } from "react-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { getLogIn, getSignUp } from "@/lib/actions";
import AuthBtn from "./AuthBtn";

type AuthFormProps = {
  type: "signUp" | "login";
};

const AuthForm = async ({ type }: AuthFormProps) => {
  const [signUpError, dispatchSignUp] = useFormState(getSignUp, undefined);
  const [signInError, disPatchLogIn] = useFormState(getLogIn, undefined);
  return (
    <form action={type === "login" ? disPatchLogIn : dispatchSignUp}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input name="email" id="email" type="email" required />
      </div>
      <div className="space-y-1 my-2">
        <Label htmlFor="password">Password</Label>
        <Input name="password" id="password" type="password" required />
      </div>
      <AuthBtn type={type} />
      {signUpError && (
        <p className="text-red-500 mt-2 ">{signUpError.message}</p>
      )}
      {signInError && (
        <p className="text-red-500 mt-2 ">{signInError.message}</p>
      )}
    </form>
  );
};

export default AuthForm;
