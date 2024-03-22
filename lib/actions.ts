"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";
import { PetTypes, Prisma } from "@prisma/client";
import { PetOmitType } from "./types";
import { z } from "zod";
import { authSchema, idFormSchema, petFormSchema } from "./zodSchema";
import { auth, signIn, signOut } from "./auth";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// USERS action
export const getLogIn = async (prevState: unknown, formData: unknown) => {
  // check if formData is FormData type
  if (!(formData instanceof FormData)) {
    return { message: "Invalid data" };
  }

  // const formDataObj = Object.fromEntries(formData.entries());
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { message: "Wrong Credentials" };
        }
        default: {
          return { message: "Could not sign in" };
        }
      }
    }
    throw error;
  }

  redirect("/app/dashboard");
  // revalidatePath("/app", "layout");
};

export const getSignUp = async (prevState: unknown, formData: unknown) => {
  // validate if formData is FormData type
  if (!(formData instanceof FormData)) {
    return { message: "Invalid inputs" };
  }
  const formDataObj = Object.fromEntries(formData.entries());
  const validateUthData = authSchema.safeParse(formDataObj);
  try {
    // validate inputs with zod
    if (!validateUthData.success) {
      return { message: "Invalid data type" };
    }
    const { email, password } = validateUthData.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Email is already exist" };
      }
    }

    return {
      message: "Could not add user",
    };
  }
  await signIn("credentials", formData);
};

export const signOutUser = async () => {
  await signOut({ redirectTo: "/" });
};

// PET action
// find user id
const findUser = async () => {
  const session = await auth();
  if (!session?.user) {
    return redirect("/");
  }

  const users = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });

  return users;
};
//  get pets
export const getPets = async () => {
  const users = await findUser();

  return await prisma.petTypes.findMany({
    where: {
      usersId: users?.id,
    },
  });
};

//  add pet

export const addPets = async (newPets: unknown) => {
  const users = await findUser();
  if (!users) {
    return redirect("/");
  }
  const validatedData = petFormSchema.safeParse(newPets);
  if (!validatedData.success) {
    return { message: "invalid data" };
  }
  try {
    await prisma.petTypes.create({
      data: {
        ...validatedData.data,
        Users: {
          connect: {
            id: users?.id,
          },
        },
      },
    });
  } catch (error) {
    return { message: "Could not add pet" };
  }

  revalidatePath("/app", "layout");
};

//update/edit data
export const editPet = async (id: unknown, newPets: unknown) => {
  // authorize user
  const user = await findUser();

  // validate with zod
  const validId = idFormSchema.safeParse(id);
  const validatedData = petFormSchema.safeParse(newPets);

  if (!validatedData.success || !validId.success) {
    return { message: "Invalid data" };
  }
  // authorized check
  const pet = await prisma.petTypes.findUnique({
    where: {
      id: validId.data,
    },
  });
  if (!pet) {
    return { message: "Pet not found" };
  }
  if (pet.usersId !== user?.id) {
    return { message: "Not authorized" };
  }
  // mutate database
  try {
    await prisma.petTypes.update({
      where: {
        id: validId.data,
      },
      data: validatedData.data,
    });
  } catch (error) {
    return { message: "Could not edit data" };
  }

  revalidatePath("/app", "layout");
};

// delete item

export const deletePet = async (id: unknown) => {
  // authorize user
  const user = await findUser();

  // get valid data with zod
  const validId = idFormSchema.safeParse(id);
  if (!validId.success) {
    return { message: "Invalid id" };
  }
  // authorized user
  const pet = await prisma.petTypes.findUnique({
    where: {
      id: validId.data,
    },
  });
  if (!pet) {
    return { message: "Pet not found" };
  }
  if (pet.usersId !== user?.id) {
    return { message: "Not authorized" };
  }
  // mutate database
  try {
    await prisma.petTypes.delete({
      where: {
        id: validId.data,
      },
    });
  } catch (error) {
    return { message: "Could not checkout pet" };
  }

  revalidatePath("/app", "layout");
};

// payment actions

export const checkOutPayment = async () => {
  const user = await findUser();
  const checkOutSession = await stripe.checkout.sessions.create({
    customer_email: user?.email,
    line_items: [{ price: "price_1OvLGHAmhwGHHlqNLfspnHEh", quantity: 1 }],
    mode: "payment",
    success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
    cancel_url: `${process.env.CANONICAL_URL}/payment?cancelled=true`,
  });

  // redirect user
  redirect(checkOutSession.url);
};
