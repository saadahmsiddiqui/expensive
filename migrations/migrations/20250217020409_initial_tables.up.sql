CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--bun:split
CREATE TABLE "users" (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), 
	firstName VARCHAR(100) NOT NULL, 
	lastName VARCHAR(100) NOT NULL, 
	email VARCHAR(100) NOT NULL, 
	createdAt DATE DEFAULT current_timestamp
);
--bun:split
CREATE TABLE "currencies" (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	currencyName VARCHAR(100) NOT NULL,
	symbol VARCHAR(10) NOT NULL,
	createdAt DATE DEFAULT current_timestamp,
	createdBy UUID REFERENCES "users"(id)
);
--bun:split
CREATE TABLE "categories" (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	categoryName VARCHAR(100) NOT NULL,
	createdAt DATE DEFAULT current_timestamp,
	createdBy UUID REFERENCES "users"(id)
);
--bun:split
CREATE TABLE "sub_categories" (
	parentCategory UUID REFERENCES categories(id),
	subCategory UUID REFERENCES categories(id),
	PRIMARY KEY (parentCategory, subCategory)
);
--bun:split
CREATE TYPE RecordType AS ENUM ('INCOME', 'EXPENSE');
--bun:split
CREATE TABLE "records" (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	amount NUMERIC(15, 3) NOT NULL,
	note VARCHAR(100),
	recordType RecordType NOT NULL,
	createdAt DATE DEFAULT current_timestamp,
	createdBy UUID REFERENCES "users"(id)
);