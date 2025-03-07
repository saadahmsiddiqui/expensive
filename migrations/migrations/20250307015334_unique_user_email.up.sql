SET statement_timeout = 0;

--bun:split

ALTER TABLE "users" ADD CONSTRAINT unique_user_email UNIQUE(email);

--bun:split
