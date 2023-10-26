import { DbUtils } from "./utils";
import { pgPool } from "./pgPool";

export function getDb() {
  return new DbUtils(pgPool);
}
