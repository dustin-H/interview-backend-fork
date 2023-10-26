import { Pool } from "pg";
import { getSubLogger } from "~/utils/logger";

import { getConfig } from "~/config";

const dbLogger = getSubLogger("DB");

export const pgPool = new Pool(getConfig("database.service"));
pgPool.on("connect", (client) => {
  const processID = { processID: 0, ...client }.processID as number;
  dbLogger.debug("DB client connected (Admin)", `[processID: ${processID}]`);
});
pgPool.on("error", (err) => {
  dbLogger.error("Client connection lost (Admin)", err);
});
