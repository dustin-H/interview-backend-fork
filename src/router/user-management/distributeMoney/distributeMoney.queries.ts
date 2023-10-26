/** Types generated for queries found in "src/router/user-management/distributeMoney/distributeMoney.sql" */
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

const selectUsersIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT\n  *\nFROM\n  \"public\".\"i_user\"\nORDER BY\n  balance"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *   *
 * FROM
 *   "public"."i_user"
 * ORDER BY
 *   balance
 * ```
 */
export const selectUsers = new PreparedQuery<ISelectUsersParams,ISelectUsersResult>(selectUsersIR);


/** 'UpdateUserBalance' parameters type */
export interface IUpdateUserBalanceParams {
  balance?: number | null | void;
  id?: string | null | void;
}

/** 'UpdateUserBalance' return type */
export type IUpdateUserBalanceResult = void;

/** 'UpdateUserBalance' query type */
export interface IUpdateUserBalanceQuery {
  params: IUpdateUserBalanceParams;
  result: IUpdateUserBalanceResult;
}

const updateUserBalanceIR: any = {"usedParamSet":{"balance":true,"id":true},"params":[{"name":"balance","required":false,"transform":{"type":"scalar"},"locs":[{"a":45,"b":52}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":69,"b":71}]}],"statement":"UPDATE\n  \"public\".\"i_user\"\nSET\n  \"balance\" = :balance\nWHERE\n  \"id\" = :id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE
 *   "public"."i_user"
 * SET
 *   "balance" = :balance
 * WHERE
 *   "id" = :id
 * ```
 */
export const updateUserBalance = new PreparedQuery<IUpdateUserBalanceParams,IUpdateUserBalanceResult>(updateUserBalanceIR);


