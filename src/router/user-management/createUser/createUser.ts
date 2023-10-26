import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getDb } from "~/database";
import { Z_user } from "../types";
import { insertUser } from "./createUser.queries";
import { userManagementLogger } from "..";

export const Z_createUserPayload = z
  .object({
    name: z.string().describe("Name of a user"),
  })
  .describe("Payload for creating a new user.");

export const Z_createUserResult = Z_user.describe("Result of creating a new user.");

export type T_createUserPayload = z.infer<typeof Z_createUserPayload>;
export type T_createUserResult = z.infer<typeof Z_createUserResult>;

export const createUser = async (payload: T_createUserPayload): Promise<T_createUserResult> => {
  const db = getDb();

  try {
    const users = await db.runQuery(insertUser, { name: payload.name });

    const user = users[0];

    return user;
  } catch (e) {
    userManagementLogger.warn(`Could not create user with name ${payload.name}`, e);
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Could not create user with name ${payload.name}`,
    });
  }
};
