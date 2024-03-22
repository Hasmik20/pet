import { PetTypes } from "@prisma/client";

export type PetOmitType = Omit<
  PetTypes,
  "id" | "createdAt" | "updatedAt" | "usersId"
>;
