import { inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  return {};
};
export type Context = inferAsyncReturnType<typeof createContext>;
