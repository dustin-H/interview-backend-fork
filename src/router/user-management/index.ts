import { publicProcedure, router } from "~/utils/trpc.js";
import { getSubLogger } from "~/utils/logger";
import { Z_createUserPayload, Z_createUserResult, createUser } from "./createUser/createUser";
import { Z_getUsersPayload, Z_getUsersResult, getUsers } from "./getUsers/getUsers";
import { Z_distributeMoneyPayload, Z_distributeMoneyResult, distributeMoney } from "./distributeMoney/distributeMoney";

export const userManagementLogger = getSubLogger("user-management");

export const userManagementRouter = router({
  createUser: publicProcedure
    .meta({
      openapi: { method: "POST", path: "/user-management/createUser", tags: ["UserManagement"], description: "Creates a new user" },
    })
    .input(Z_createUserPayload)
    .output(Z_createUserResult)
    .mutation(async ({ input }) => {
      return await createUser(input);
    }),
  getUsers: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/user-management/getUsers",
        tags: ["UserManagement"],
        description: "Returns a list of all users",
      },
    })
    .input(Z_getUsersPayload)
    .output(Z_getUsersResult)
    .query(async ({ input }) => {
      return await getUsers(input);
    }),
  distributeMoney: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/user-management/distributeMoney",
        tags: ["UserManagement"],
        description: "Distrubutes an amount of money to the 3 poorest users",
      },
    })
    .input(Z_distributeMoneyPayload)
    .output(Z_distributeMoneyResult)
    .mutation(async ({ input }) => {
      return await distributeMoney(input);
    }),
});
