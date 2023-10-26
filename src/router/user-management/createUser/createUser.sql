/* @name insertUser */
INSERT INTO "public"."i_user"("name")
  VALUES (:name)
RETURNING
  id, name, balance;

