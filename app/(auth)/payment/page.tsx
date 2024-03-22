"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";

import { checkOutPayment } from "@/lib/actions";
import H1 from "@/components/dashboard/H1";

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};
const PaymentPage = ({ searchParams }: PageProps) => {
  const [isPending, startTransition] = useTransition();
  return (
    <main className="flex flex-col items-center space-y-4">
      <H1>PetSoft requires payment</H1>
      {!searchParams.success && (
        <Button
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => await checkOutPayment());
          }}
        >
          {isPending ? "Loading..." : "Buy lifetime access for $299"}
        </Button>
      )}
      {searchParams.success && (
        <p className="text-lg text-green-500">Payment successful!</p>
      )}
      {searchParams.cancelled && (
        <p className="text-lg text-red-500">
          Payment cancelled! You can try again.
        </p>
      )}
    </main>
  );
};

export default PaymentPage;
