/* @name selectUsers */
SELECT
  *
FROM
  "public"."i_user"
ORDER BY
  balance;


/* @name updateUserBalance */
UPDATE
  "public"."i_user"
SET
  "balance" = :balance
WHERE
  "id" = :id;

