SET statement_timeout = 0;

--bun:split
CREATE TABLE "sub_categories" (
	parentCategory UUID REFERENCES categories(id),
	subCategory UUID REFERENCES categories(id),
	PRIMARY KEY (parentCategory, subCategory)
);
--bun:split
ALTER TABLE "categories" DROP COLUMN parent;