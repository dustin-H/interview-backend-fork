/** Types generated for queries found in "src/router/user-management/createUser/createUser.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'InsertUser' parameters type */
export interface IInsertUserParams {
  name?: string | null | void;
}

/** 'InsertUser' return type */
export interface IInsertUserResult {
  balance: number;
  id: string;
  name: string;
}

/** 'InsertUser' query type */
export interface IInsertUserQuery {
  params: IInsertUserParams;
  result: IInsertUserResult;
}

const insertUserIR: any = {"usedParamSet":{"name":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":48,"b":52}]}],"statement":"INSERT INTO \"public\".\"i_user\"(\"name\")\n  VALUES (:name)\nRETURNING\n  id, name, balance"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "public"."i_user"("name")
 *   VALUES (:name)
 * RETURNING
 *   id, name, balance
 * ```
 */
export const insertUser = new PreparedQuery<IInsertUserParams,IInsertUserResult>(insertUserIR);


