import SignOutBtn from "@/components/auth/SignOutBtn";
import ContentContainer from "@/components/dashboard/ContentContainer";
import H1 from "@/components/dashboard/H1";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import React from "react";

const AccountPage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }
  return (
    <section className="py-4">
      <H1>Your Account</H1>
      <div className="flex flex-col gap-4 justify-center items-center h-[500px] mt-[50px] bg-white rounded-md shadow-sm overflow-hidden">
        <p>
          You logged in as:{" "}
          <span className="font-bold"> {session.user.email} </span>
        </p>
        <SignOutBtn />
      </div>
    </section>
  );
};

export default AccountPage;
