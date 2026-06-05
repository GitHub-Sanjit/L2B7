# PostgreSQL Database Management and Data Types using pgAdmin

# Interview Preparation Notes

---

# Table of Contents

1. Introduction to SQL
2. pgAdmin Basics
3. Beekeeper Studio
4. Integer & Boolean Data Types
5. Character, Date & UUID Data Types
6. Create & Drop Database/Table
7. Column Constraints
8. Multiple Constraints
9. Data Insertion Methods
10. Insert Without Column Names
11. Most Important Interview Questions & Answers
12. Practical SQL Examples

---

# 1. Introduction to SQL

## What is SQL?

SQL stands for:

**Structured Query Language**

It is the standard language used to:

- Store data
- Retrieve data
- Modify data
- Delete data
- Manage databases

SQL works with relational databases such as:

- PostgreSQL
- MySQL
- SQL Server
- Oracle

---

## Why SQL is Important?

Every backend application needs a database.

Examples:

- Facebook stores user data
- Amazon stores product data
- Banking systems store account data

SQL helps applications communicate with databases.

---

## Types of SQL Commands

### DDL (Data Definition Language)

Used to define database structure.

Examples:

```sql
CREATE
ALTER
DROP
TRUNCATE
```

---

### DML (Data Manipulation Language)

Used to modify data.

```sql
INSERT
UPDATE
DELETE
```

---

### DQL (Data Query Language)

Used to retrieve data.

```sql
SELECT
```

---

### DCL (Data Control Language)

Used for permissions.

```sql
GRANT
REVOKE
```

---

# Interview Question

## What is SQL?

### Answer

SQL (Structured Query Language) is a standard language used to communicate with relational databases. It allows users to create, retrieve, update, delete, and manage data efficiently.

---

# 2. pgAdmin Basics

## What is pgAdmin?

pgAdmin is the graphical user interface (GUI) tool for PostgreSQL.

It allows developers to:

- Create databases
- Create tables
- Run SQL queries
- Manage users
- Backup databases

without using terminal commands.

---

## pgAdmin Components

### Browser Panel

Shows:

- Servers
- Databases
- Schemas
- Tables

---

### Query Tool

Used to execute SQL commands.

Example:

```sql
SELECT * FROM users;
```

---

### Dashboard

Displays:

- Database activity
- Connections
- Performance statistics

---

# Interview Question

## What is pgAdmin?

### Answer

pgAdmin is an open-source graphical administration and management tool for PostgreSQL databases. It provides an easy way to create databases, tables, execute queries, and monitor database performance.

---

# 3. Beekeeper Studio

## What is Beekeeper Studio?

Beekeeper Studio is a modern SQL client.

Features:

- Connect multiple databases
- Write SQL queries
- View data visually
- Open-source

Supports:

- PostgreSQL
- MySQL
- SQLite
- SQL Server

---

# Interview Question

## Why use Beekeeper Studio?

### Answer

Beekeeper Studio provides a user-friendly interface for managing databases, writing SQL queries, and visualizing data. It supports multiple database systems from one application.

---

# 4. Integer & Boolean Types

---

## Integer Data Types

Used to store whole numbers.

### SMALLINT

Range:

```text
-32,768 to 32,767
```

Example:

```sql
age SMALLINT
```

---

### INTEGER

Range:

```text
-2,147,483,648 to 2,147,483,647
```

Example:

```sql
salary INTEGER
```

---

### BIGINT

Range:

```text
Very large integers
```

Example:

```sql
population BIGINT
```

---

## Boolean Type

Stores:

```text
TRUE
FALSE
NULL
```

Example:

```sql
is_active BOOLEAN
```

---

### Insert Example

```sql
INSERT INTO users(name, is_active)
VALUES ('John', TRUE);
```

---

# Interview Question

## Difference between INTEGER and BIGINT?

### Answer

INTEGER stores 4-byte integers and has a smaller range. BIGINT stores 8-byte integers and supports much larger numeric values.

---

# Interview Question

## What values can BOOLEAN store?

### Answer

BOOLEAN can store:

- TRUE
- FALSE
- NULL

---

# 5. Character, Date & UUID Types

---

# Character Types

## CHAR(n)

Fixed length.

Example:

```sql
country_code CHAR(2)
```

Stored:

```text
'US'
'BD'
```

---

## VARCHAR(n)

Variable length.

Example:

```sql
name VARCHAR(100)
```

---

## TEXT

Unlimited length text.

Example:

```sql
description TEXT
```

---

# Interview Question

## Difference between CHAR and VARCHAR?

### Answer

CHAR stores fixed-length strings and pads extra spaces if needed. VARCHAR stores variable-length strings and uses only the required storage.

---

# Date Types

---

## DATE

Stores:

```text
YYYY-MM-DD
```

Example:

```sql
birth_date DATE
```

---

## TIME

Stores time only.

Example:

```sql
login_time TIME
```

---

## TIMESTAMP

Stores date and time.

Example:

```sql
created_at TIMESTAMP
```

---

# UUID Type

UUID = Universally Unique Identifier

Example:

```text
550e8400-e29b-41d4-a716-446655440000
```

---

### Column Example

```sql
id UUID
```

---

### Generate UUID

```sql
SELECT gen_random_uuid();
```

---

# Interview Question

## Why use UUID instead of INTEGER IDs?

### Answer

UUIDs are globally unique and difficult to guess, making them useful in distributed systems and improving security compared to sequential integer IDs.

---

# 6. Create & Drop Database/Table

---

# Create Database

```sql
CREATE DATABASE company_db;
```

---

# Delete Database

```sql
DROP DATABASE company_db;
```

---

# Create Table

```sql
CREATE TABLE employees(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);
```

---

# Delete Table

```sql
DROP TABLE employees;
```

---

# Interview Question

## Difference between DROP DATABASE and DROP TABLE?

### Answer

DROP DATABASE removes the entire database and all contained objects. DROP TABLE removes only a specific table while leaving the database intact.

---

# 7. Column Constraints

Constraints enforce rules on table columns.

---

## NOT NULL

Cannot store NULL values.

```sql
name VARCHAR(100) NOT NULL
```

---

## UNIQUE

Prevents duplicate values.

```sql
email VARCHAR(255) UNIQUE
```

---

## PRIMARY KEY

Uniquely identifies each row.

```sql
id SERIAL PRIMARY KEY
```

---

## DEFAULT

Provides default value.

```sql
is_active BOOLEAN DEFAULT TRUE
```

---

## CHECK

Validates data.

```sql
age INT CHECK(age > 0)
```

---

# Interview Question

## What is a constraint?

### Answer

A constraint is a rule applied to a database column that ensures data integrity and accuracy.

---

# 8. Multiple Constraints

Multiple constraints can be applied together.

Example:

```sql
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INTEGER CHECK(age >= 18),
    is_active BOOLEAN DEFAULT TRUE
);
```

---

# Interview Question

## Why use multiple constraints?

### Answer

Multiple constraints ensure stronger data validation by enforcing uniqueness, mandatory values, valid ranges, and default values simultaneously.

---

# 9. Insert Data Methods

---

## Insert Single Row

```sql
INSERT INTO users(name, age)
VALUES ('John', 25);
```

---

## Insert Multiple Rows

```sql
INSERT INTO users(name, age)
VALUES
('John',25),
('Alice',30),
('Bob',22);
```

---

# Interview Question

## How do you insert multiple rows?

### Answer

Multiple rows can be inserted using a single INSERT statement by separating row values with commas.

---

Example:

```sql
INSERT INTO users(name, age)
VALUES
('John',25),
('Alice',30);
```

---

# 10. Insert Without Column Names

If values match table structure exactly:

```sql
INSERT INTO users
VALUES
(1,'John',25,TRUE);
```

---

## Why Avoid This?

Because column order changes can break queries.

Preferred:

```sql
INSERT INTO users(id,name,age,is_active)
VALUES
(1,'John',25,TRUE);
```

---

# Interview Question

## Why is specifying column names recommended?

### Answer

Specifying column names improves readability, prevents errors when table structure changes, and makes SQL queries easier to maintain.

---

# Practical Example

Create table:

```sql
CREATE TABLE students(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    age INTEGER CHECK(age >= 18),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

Insert data:

```sql
INSERT INTO students(name,email,age)
VALUES
('John','john@gmail.com',22),
('Alice','alice@gmail.com',25);
```

---

Retrieve data:

```sql
SELECT * FROM students;
```

---

# Top Interview Questions

---

## Q1. What is SQL?

SQL is a language used to communicate with relational databases.

---

## Q2. What is PostgreSQL?

PostgreSQL is an open-source relational database management system (RDBMS).

---

## Q3. What is pgAdmin?

pgAdmin is a GUI tool used to manage PostgreSQL databases.

---

## Q4. What is a Primary Key?

A primary key uniquely identifies each row in a table.

---

## Q5. Difference between PRIMARY KEY and UNIQUE?

PRIMARY KEY:
- Cannot be NULL
- Only one per table

UNIQUE:
- Can allow NULL values
- Multiple UNIQUE constraints can exist

---

## Q6. What is NOT NULL?

Ensures a column always contains a value.

---

## Q7. What is CHECK constraint?

Validates data according to a specified condition.

Example:

```sql
CHECK(age >= 18)
```

---

## Q8. What is DEFAULT constraint?

Automatically inserts a default value when no value is provided.

---

## Q9. Difference between CHAR and VARCHAR?

CHAR:
- Fixed length

VARCHAR:
- Variable length

---

## Q10. Why use UUID?

Provides globally unique identifiers and improves security.

---

## Q11. Difference between DATE and TIMESTAMP?

DATE stores only date.

TIMESTAMP stores both date and time.

---

## Q12. What is BOOLEAN?

A data type that stores TRUE, FALSE, or NULL.

---

# Summary

After completing this module, you should be able to:

✅ Understand SQL basics

✅ Use pgAdmin effectively

✅ Manage PostgreSQL databases

✅ Create and delete tables

✅ Work with Integer, Boolean, Character, Date, and UUID types

✅ Apply constraints

✅ Insert data using different methods

✅ Answer common PostgreSQL interview questions confidently