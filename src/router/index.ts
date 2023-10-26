import { router } from "~/utils/trpc.js";
import { userManagementRouter } from "./user-management";

/**
 * This is the main router
 *
 * We have to register all modules here
 */
export const appRouter = router({
  management: userManagementRouter,
});

export type AppRouter = typeof appRouter;
