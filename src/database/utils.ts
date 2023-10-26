import { Pool, PoolClient } from "pg";
import { PreparedQuery } from "@pgtyped/runtime";

export class DbUtils {
  public pgPool: Pool;

  constructor(pgPool: Pool) {
    this.pgPool = pgPool;
  }

  public async transact<T>(run: (client: PoolClient) => Promise<T>) {
    const client = await this.pgPool.connect();
    try {
      await client.query("BEGIN;");

      const data = await run(client);
      await client.query("COMMIT;");
      return data;
    } catch (err) {
      try {
        await client.query("ROLLBACK;");
      } catch (e) {
        /* empty */
      }
      throw err;
    } finally {
      client.release();
    }
  }

  public async runQuery<Params, Result>(preparedQuery: PreparedQuery<Params, Result>, params?: Params) {
    return await this.transact((client) => {
      // Params can be void by definition => undefined
      const theParams = params as Params;
      return preparedQuery.run(theParams, client);
    });
  }
}
