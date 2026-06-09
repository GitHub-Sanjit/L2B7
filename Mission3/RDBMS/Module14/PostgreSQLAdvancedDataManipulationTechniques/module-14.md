# PostgreSQL Advanced Data Manipulation Techniques

# Interview Preparation Notes

---

# Table of Contents

1. ALTER TABLE & Constraints
2. ALTER Default Values & Column Constraints
3. SELECT Basics: Sorting & Aliases
4. DISTINCT & WHERE Filtering
5. Filtering with AND & OR
6. Comparison Operators, BETWEEN & IN
7. LIKE vs ILIKE
8. NOT Operator & Scalar Functions
9. Aggregate Functions
10. Practical Examples
11. Most Important Interview Questions & Answers

---

# 1. ALTER TABLE & Constraints

## What is ALTER TABLE?

The `ALTER TABLE` command is used to modify an existing table structure without deleting and recreating the table.

Common operations:

* Add columns
* Remove columns
* Rename columns
* Rename tables
* Add constraints
* Remove constraints
* Change data types

---

## Add a New Column

```sql
ALTER TABLE employees
ADD COLUMN salary INTEGER;
```

---

## Remove a Column

```sql
ALTER TABLE employees
DROP COLUMN salary;
```

---

## Rename a Column

```sql
ALTER TABLE employees
RENAME COLUMN salary TO monthly_salary;
```

---

## Rename a Table

```sql
ALTER TABLE employees
RENAME TO staff;
```

---

## Change Data Type

```sql
ALTER TABLE employees
ALTER COLUMN age TYPE BIGINT;
```

---

## Add Constraint

```sql
ALTER TABLE employees
ADD CONSTRAINT unique_email UNIQUE(email);
```

---

## Remove Constraint

```sql
ALTER TABLE employees
DROP CONSTRAINT unique_email;
```

---

# Interview Question

## What is ALTER TABLE used for?

### Answer

ALTER TABLE is used to modify an existing table structure by adding, deleting, renaming columns, changing data types, or managing constraints without recreating the table.

---

# 2. ALTER Default Values & Column Constraints

---

## Add Default Value

```sql
ALTER TABLE users
ALTER COLUMN is_active
SET DEFAULT TRUE;
```

---

## Remove Default Value

```sql
ALTER TABLE users
ALTER COLUMN is_active
DROP DEFAULT;
```

---

## Add NOT NULL Constraint

```sql
ALTER TABLE users
ALTER COLUMN email
SET NOT NULL;
```

---

## Remove NOT NULL Constraint

```sql
ALTER TABLE users
ALTER COLUMN email
DROP NOT NULL;
```

---

## Add CHECK Constraint

```sql
ALTER TABLE users
ADD CONSTRAINT age_check
CHECK(age >= 18);
```

---

# Interview Question

## Why are constraints important?

### Answer

Constraints enforce data integrity and ensure invalid or duplicate data cannot be stored in the database.

---

# 3. SELECT Basics: Sorting & Aliases

---

## SELECT Statement

Used to retrieve data from a table.

```sql
SELECT * FROM employees;
```

---

## Select Specific Columns

```sql
SELECT name, salary
FROM employees;
```

---

# Sorting with ORDER BY

---

## Ascending Order

```sql
SELECT *
FROM employees
ORDER BY salary ASC;
```

---

## Descending Order

```sql
SELECT *
FROM employees
ORDER BY salary DESC;
```

---

# Column Alias

Aliases provide temporary names.

```sql
SELECT name AS employee_name
FROM employees;
```

---

## Alias Example

```sql
SELECT salary AS monthly_salary
FROM employees;
```

---

# Interview Question

## What is an Alias?

### Answer

An alias is a temporary name assigned to a column or table in a query to improve readability.

---

# Interview Question

## What is ORDER BY?

### Answer

ORDER BY sorts query results in ascending or descending order.

---

# 4. DISTINCT & WHERE Filtering

---

# DISTINCT

Used to remove duplicate values.

---

Example:

```sql
SELECT DISTINCT department
FROM employees;
```

---

Without DISTINCT:

```text
HR
HR
IT
IT
Finance
```

---

With DISTINCT:

```text
HR
IT
Finance
```

---

# WHERE Clause

Filters records based on conditions.

```sql
SELECT *
FROM employees
WHERE salary > 50000;
```

---

# Interview Question

## What is DISTINCT?

### Answer

DISTINCT removes duplicate values and returns unique records from a query result.

---

# Interview Question

## What is WHERE used for?

### Answer

WHERE filters rows based on specified conditions before returning results.

---

# 5. Filtering with AND & OR

---

## AND Operator

All conditions must be true.

```sql
SELECT *
FROM employees
WHERE department = 'IT'
AND salary > 50000;
```

---

## OR Operator

At least one condition must be true.

```sql
SELECT *
FROM employees
WHERE department = 'IT'
OR department = 'HR';
```

---

## Combined Example

```sql
SELECT *
FROM employees
WHERE department = 'IT'
AND salary > 50000
OR department = 'Finance';
```

---

# Interview Question

## Difference between AND and OR?

### Answer

AND requires all conditions to be true. OR requires at least one condition to be true.

---

# 6. Comparison Operators, BETWEEN & IN

---

# Comparison Operators

| Operator | Meaning            |
| -------- | ------------------ |
| =        | Equal              |
| !=       | Not Equal          |
| >        | Greater Than       |
| <        | Less Than          |
| >=       | Greater Than Equal |
| <=       | Less Than Equal    |

---

Example:

```sql
SELECT *
FROM employees
WHERE salary >= 50000;
```

---

# BETWEEN

Used for range filtering.

```sql
SELECT *
FROM employees
WHERE salary BETWEEN 30000 AND 60000;
```

Equivalent:

```sql
WHERE salary >= 30000
AND salary <= 60000;
```

---

# IN Operator

Checks multiple values.

```sql
SELECT *
FROM employees
WHERE department IN ('IT','HR','Finance');
```

Equivalent:

```sql
WHERE department='IT'
OR department='HR'
OR department='Finance';
```

---

# Interview Question

## What is BETWEEN?

### Answer

BETWEEN filters values within an inclusive range, including both boundary values.

---

# Interview Question

## What is IN used for?

### Answer

IN simplifies checking whether a value matches any item in a list.

---

# 7. LIKE vs ILIKE

---

# LIKE

Pattern matching.

Case-sensitive.

```sql
SELECT *
FROM users
WHERE name LIKE 'J%';
```

Returns:

```text
John
James
Jack
```

---

## Wildcards

### %

Represents multiple characters.

```sql
LIKE 'A%'
```

Starts with A.

---

### _

Represents a single character.

```sql
LIKE '_ohn'
```

Matches:

```text
John
```

---

# ILIKE

Case-insensitive pattern matching.

```sql
SELECT *
FROM users
WHERE name ILIKE 'john';
```

Matches:

```text
JOHN
John
john
JoHn
```

---

# Interview Question

## Difference between LIKE and ILIKE?

### Answer

LIKE is case-sensitive while ILIKE is case-insensitive in PostgreSQL.

---

# 8. NOT Operator & Scalar Functions

---

# NOT Operator

Reverses conditions.

---

Example:

```sql
SELECT *
FROM employees
WHERE NOT department = 'IT';
```

---

## NOT IN

```sql
SELECT *
FROM employees
WHERE department NOT IN ('IT','HR');
```

---

## NOT BETWEEN

```sql
SELECT *
FROM employees
WHERE salary NOT BETWEEN 30000 AND 60000;
```

---

# Scalar Functions

Operate on individual values.

One input → One output.

---

## UPPER()

Converts to uppercase.

```sql
SELECT UPPER(name)
FROM employees;
```

---

## LOWER()

Converts to lowercase.

```sql
SELECT LOWER(name)
FROM employees;
```

---

## LENGTH()

Returns string length.

```sql
SELECT LENGTH(name)
FROM employees;
```

---

## CONCAT()

Joins strings.

```sql
SELECT CONCAT(first_name,' ',last_name)
FROM employees;
```

---

## CURRENT_DATE

Returns current date.

```sql
SELECT CURRENT_DATE;
```

---

## CURRENT_TIMESTAMP

Returns current date and time.

```sql
SELECT CURRENT_TIMESTAMP;
```

---

# Interview Question

## What is a Scalar Function?

### Answer

A scalar function operates on a single value and returns a single value.

---

# 9. Aggregate Functions Explained

---

Aggregate functions perform calculations on multiple rows and return a single result.

---

# COUNT()

Counts rows.

```sql
SELECT COUNT(*)
FROM employees;
```

---

# SUM()

Calculates total.

```sql
SELECT SUM(salary)
FROM employees;
```

---

# AVG()

Calculates average.

```sql
SELECT AVG(salary)
FROM employees;
```

---

# MIN()

Returns smallest value.

```sql
SELECT MIN(salary)
FROM employees;
```

---

# MAX()

Returns largest value.

```sql
SELECT MAX(salary)
FROM employees;
```

---

# Aggregate Example

```sql
SELECT
COUNT(*) AS total_employees,
AVG(salary) AS average_salary,
MAX(salary) AS highest_salary,
MIN(salary) AS lowest_salary
FROM employees;
```

---

# Interview Question

## What is the difference between Scalar Functions and Aggregate Functions?

### Answer

Scalar functions operate on a single row value and return one result per row.

Aggregate functions operate on multiple rows and return one summarized result.

Example:

Scalar:

```sql
UPPER(name)
```

Aggregate:

```sql
COUNT(*)
```

---

# Practical Example

Create Table:

```sql
CREATE TABLE employees(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(50),
    salary INTEGER
);
```

---

Insert Data:

```sql
INSERT INTO employees(name,department,salary)
VALUES
('John','IT',60000),
('Alice','HR',45000),
('Bob','IT',70000),
('David','Finance',55000);
```

---

Queries:

```sql
SELECT * FROM employees;
```

```sql
SELECT DISTINCT department FROM employees;
```

```sql
SELECT * FROM employees
WHERE salary > 50000;
```

```sql
SELECT * FROM employees
ORDER BY salary DESC;
```

```sql
SELECT AVG(salary)
FROM employees;
```

---

# Top Interview Questions

## Q1. What is ALTER TABLE?

Used to modify an existing table structure.

---

## Q2. How do you add a column?

```sql
ALTER TABLE employees
ADD COLUMN age INTEGER;
```

---

## Q3. What is ORDER BY?

Sorts query results.

---

## Q4. What is DISTINCT?

Removes duplicate values.

---

## Q5. What is WHERE?

Filters rows based on conditions.

---

## Q6. Difference between AND and OR?

AND requires all conditions true; OR requires at least one.

---

## Q7. What is BETWEEN?

Filters values within an inclusive range.

---

## Q8. What is IN?

Checks whether a value exists in a list.

---

## Q9. Difference between LIKE and ILIKE?

LIKE is case-sensitive; ILIKE is case-insensitive.

---

## Q10. What does NOT do?

Reverses a condition.

---

## Q11. Name some Scalar Functions.

* UPPER()
* LOWER()
* LENGTH()
* CONCAT()

---

## Q12. Name some Aggregate Functions.

* COUNT()
* SUM()
* AVG()
* MIN()
* MAX()

---

## Q13. Difference between COUNT(*) and COUNT(column)?

COUNT(*)

Counts all rows.

COUNT(column)

Counts only non-NULL values.

---

## Q14. Which clause executes first: WHERE or ORDER BY?

WHERE executes first to filter rows, then ORDER BY sorts the filtered results.

---

# Summary

After completing this module, you should be able to:

✅ Modify tables using ALTER TABLE

✅ Add and remove constraints

✅ Work with SELECT queries

✅ Sort data using ORDER BY

✅ Use aliases effectively

✅ Filter data using WHERE

✅ Apply AND, OR, NOT conditions

✅ Use BETWEEN and IN

✅ Perform pattern matching with LIKE and ILIKE

✅ Use Scalar Functions

✅ Use Aggregate Functions

✅ Answer PostgreSQL interview questions confidently
