import { z } from "zod";

export const Z_user = z
  .object({
    id: z.string().describe("ID of a user"),
    name: z.string().describe("Name of a user"),
    balance: z.number().describe("Current balance of a user"),
  })
  .describe("Payload for creating a new user.");

export type T_user = z.infer<typeof Z_user>;
