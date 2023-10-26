import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "~/utils/context.js";
import { OpenApiMeta } from "trpc-openapi";
import { logger } from "./logger";

const t = initTRPC.meta<OpenApiMeta>().context<Context>().create();

export const router = t.router;

export const publicProcedure = t.procedure.use(async ({ ctx, next, path }) => {
  logger.info("Run procedure:", path);
  const result = await next({ ctx: { ...ctx } });

  if (!result.ok) {
    if (result.error.code === "INTERNAL_SERVER_ERROR") {
      logger.error("Procedure failed:", path, result.error.code, result.error);
      // Hide details of error
      result.error = new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    } else {
      logger.error("Procedure failed:", path, result.error.code, result.error, result.error.message);
    }
  }

  return result;
});

export function for_ts_this_is_no_module_without_this_function() {}
