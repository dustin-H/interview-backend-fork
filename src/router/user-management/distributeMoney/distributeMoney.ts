import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getDb } from "~/database";
import { Z_user } from "../types";
import { userManagementLogger } from "..";
import { selectUsers, updateUserBalance } from "./distributeMoney.queries";

export const Z_distributeMoneyPayload = z
  .object({
    amount: z.number().describe("Amount which gets distributed to the poorest users."),
  })
  .describe("Payload for distributing money.");

export const Z_distributeMoneyResult = z.array(Z_user).describe("Result of distributing money.");

export type T_distributeMoneyPayload = z.infer<typeof Z_distributeMoneyPayload>;
export type T_distributeMoneyResult = z.infer<typeof Z_distributeMoneyResult>;

export const distributeMoney = async (payload: T_distributeMoneyPayload): Promise<T_distributeMoneyResult> => {
  const db = getDb();

  try {
    return db.transact(async (client) => {
      const users = await selectUsers.run(undefined, client);

      if (users.length < 3) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `There are not enough users to distribute.`,
        });
      }

      // The poorest user gets 50%
      const firstAmount = Math.round(payload.amount * 0.5);
      await updateUserBalance.run({ balance: users[0].balance + firstAmount, id: users[0].id }, client);

      // The second poorest user gets 30%
      const secoundAmount = Math.round(payload.amount * 0.3);
      await updateUserBalance.run({ balance: users[1].balance + secoundAmount, id: users[1].id }, client);

      // The third poorest user gets 20%
      const thirdAmount = Math.round(payload.amount * 0.2);
      await updateUserBalance.run({ balance: users[2].balance + thirdAmount, id: users[2].id }, client);

      const finalUsers = await selectUsers.run(undefined, client);

      return finalUsers;
    });
  } catch (e) {
    userManagementLogger.warn(`Could not distribute money`, e);
    if (e instanceof TRPCError) {
      throw e;
    }
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Could not distribute money`,
    });
  }
};
