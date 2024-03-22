"use client";
import { signOutUser } from "@/lib/actions";
import { Button } from "../ui/button";

import { useTransition } from "react";

const SignOutBtn = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      onClick={async () => {
        startTransition(async () => await signOutUser());
      }}
    >
      Sign out
    </Button>
  );
};

export default SignOutBtn;
