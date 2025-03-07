SET statement_timeout = 0;

--bun:split

ALTER TABLE "users" DROP CONSTRAINT unique_user_email;

--bun:split
