/** Types generated for queries found in "src/router/user-management/getUsers/getUsers.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'SelectUsers' parameters type */
export type ISelectUsersParams = void;

/** 'SelectUsers' return type */
export interface ISelectUsersResult {
  balance: number;
  id: string;
  name: string;
}

/** 'SelectUsers' query type */
export interface ISelectUsersQuery {
  params: ISelectUsersParams;
  result: ISelectUsersResult;
}

const selectUsersIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT\n  *\nFROM\n  \"public\".\"i_user\""};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *   *
 * FROM
 *   "public"."i_user"
 * ```
 */
export const selectUsers = new PreparedQuery<ISelectUsersParams,ISelectUsersResult>(selectUsersIR);


