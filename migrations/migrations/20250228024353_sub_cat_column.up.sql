SET statement_timeout = 0;

--bun:split
DROP TABLE "sub_categories";
--bun:split
ALTER TABLE "categories" ADD parent UUID REFERENCES categories(id);