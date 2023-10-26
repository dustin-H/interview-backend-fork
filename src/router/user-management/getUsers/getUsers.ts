import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getDb } from "~/database";
import { Z_user } from "../types";
import { userManagementLogger } from "..";
import { selectUsers } from "./getUsers.queries";

export const Z_getUsersPayload = z.object({}).describe("Payload for getting all users.");

export const Z_getUsersResult = z.array(Z_user).describe("Result of getting all users.");

export type T_getUsersPayload = z.infer<typeof Z_getUsersPayload>;
export type T_getUsersResult = z.infer<typeof Z_getUsersResult>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getUsers = async (payload: T_getUsersPayload): Promise<T_getUsersResult> => {
  const db = getDb();

  try {
    const users = await db.runQuery(selectUsers);

    return users;
  } catch (e) {
    userManagementLogger.warn(`Could not get users`, e);
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Could not get users`,
    });
  }
};
