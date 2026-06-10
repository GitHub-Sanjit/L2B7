# Advanced SQL Concepts - Interview Preparation Guide

## Module 16: Advanced SQL Concepts

This guide covers essential advanced SQL concepts commonly asked in technical interviews for roles such as **Backend Developer, Full Stack Developer, Data Analyst, Database Developer, and Software Engineer**.

---

# 16-1 to 16-3: Advanced SQL Query Practice (Using Keywords)

## Important SQL Keywords

### 1. DISTINCT

Used to remove duplicate records.

```sql
SELECT DISTINCT country
FROM students;
```

### Interview Question

**Q: What is the difference between `DISTINCT` and `GROUP BY`?**

**Answer:**

| DISTINCT                                | GROUP BY                            |
| --------------------------------------- | ----------------------------------- |
| Removes duplicate rows                  | Groups rows for aggregation         |
| Cannot directly use aggregate functions | Often used with aggregate functions |
| Simpler for unique values               | More flexible for calculations      |

Example:

```sql
SELECT DISTINCT department
FROM employees;
```

```sql
SELECT department, COUNT(*)
FROM employees
GROUP BY department;
```

---

### 2. ORDER BY

Sorts result sets.

```sql
SELECT *
FROM employees
ORDER BY salary DESC;
```

### Interview Question

**Q: What is the default sorting order in SQL?**

**Answer:**

Ascending (`ASC`) is the default order.

```sql
ORDER BY salary;
```

Equivalent to:

```sql
ORDER BY salary ASC;
```

---

### 3. LIMIT / TOP

Restricts the number of returned rows.

PostgreSQL/MySQL:

```sql
SELECT *
FROM employees
LIMIT 5;
```

SQL Server:

```sql
SELECT TOP 5 *
FROM employees;
```

### Interview Question

**Q: How do you find the second highest salary?**

**Answer:**

```sql
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;
```

Alternative using subquery:

```sql
SELECT MAX(salary)
FROM employees
WHERE salary < (
    SELECT MAX(salary)
    FROM employees
);
```

---

### 4. CASE Statement

Performs conditional logic.

```sql
SELECT name,
       salary,
       CASE
           WHEN salary >= 100000 THEN 'High'
           WHEN salary >= 50000 THEN 'Medium'
           ELSE 'Low'
       END AS salary_category
FROM employees;
```

### Interview Question

**Q: Can CASE be used in ORDER BY?**

**Answer:**

Yes.

Example:

```sql
ORDER BY CASE
             WHEN department = 'IT' THEN 1
             ELSE 2
         END;
```

---

# 16-4: Subquery Basics

## What is a Subquery?

A query nested inside another query.

### Types of Subqueries

### 1. Single-Row Subquery

Returns one value.

```sql
SELECT *
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);
```

---

### 2. Multiple-Row Subquery

Returns multiple values.

```sql
SELECT *
FROM employees
WHERE department_id IN (
    SELECT department_id
    FROM departments
    WHERE location = 'New York'
);
```

---

### 3. Correlated Subquery

Executes once for each row of the outer query.

```sql
SELECT e1.*
FROM employees e1
WHERE salary >
(
    SELECT AVG(salary)
    FROM employees e2
    WHERE e1.department_id = e2.department_id
);
```

---

## Interview Questions

### Q1: What is the difference between a subquery and a join?

### Answer:

| Subquery                         | Join                             |
| -------------------------------- | -------------------------------- |
| Query inside another query       | Combines multiple tables         |
| Can be slower for large datasets | Usually more efficient           |
| Easier for simple logic          | Better for complex relationships |

---

### Q2: What is a correlated subquery?

### Answer:

A correlated subquery references columns from the outer query and executes once per outer row.

Because it runs repeatedly, it may have performance implications.

---

# 16-5: SQL Functions Explained

Functions perform calculations and transformations.

---

## Aggregate Functions

### COUNT()

```sql
SELECT COUNT(*)
FROM employees;
```

Returns total rows.

---

### SUM()

```sql
SELECT SUM(salary)
FROM employees;
```

Returns total salary.

---

### AVG()

```sql
SELECT AVG(salary)
FROM employees;
```

Returns average salary.

---

### MIN()

```sql
SELECT MIN(salary)
FROM employees;
```

Returns minimum value.

---

### MAX()

```sql
SELECT MAX(salary)
FROM employees;
```

Returns maximum value.

---

## String Functions

### UPPER()

```sql
SELECT UPPER(first_name)
FROM employees;
```

---

### LOWER()

```sql
SELECT LOWER(email)
FROM employees;
```

---

### LENGTH()

```sql
SELECT LENGTH(name)
FROM employees;
```

---

## Date Functions

### CURRENT_DATE

```sql
SELECT CURRENT_DATE;
```

---

### AGE() (PostgreSQL)

```sql
SELECT AGE(hire_date);
```

---

## Interview Questions

### Q1: What is the difference between COUNT(*) and COUNT(column)?

### Answer:

**COUNT(*)**

* Counts all rows.
* Includes NULL values.

**COUNT(column)**

* Counts only non-NULL values.

Example:

| ID | Bonus |
| -- | ----- |
| 1  | 500   |
| 2  | NULL  |
| 3  | 100   |

```sql
SELECT COUNT(*);      -- 3
SELECT COUNT(Bonus);  -- 2
```

---

### Q2: Which aggregate functions ignore NULL values?

### Answer:

* SUM()
* AVG()
* MIN()
* MAX()
* COUNT(column)

All ignore NULL values except COUNT(*).

---

# 16-6 and 16-7: Stored Procedures

## What is a Stored Procedure?

A precompiled collection of SQL statements stored in the database.

Benefits:

* Code reusability
* Improved performance
* Enhanced security
* Reduced network traffic

---

## Example Procedure

MySQL:

```sql
DELIMITER //

CREATE PROCEDURE GetEmployees()
BEGIN
    SELECT *
    FROM employees;
END //

DELIMITER ;
```

Execute:

```sql
CALL GetEmployees();
```

---

## Procedure with Parameters

```sql
DELIMITER //

CREATE PROCEDURE GetEmployeeByDept(
    IN dept_id INT
)
BEGIN
    SELECT *
    FROM employees
    WHERE department_id = dept_id;
END //

DELIMITER ;
```

Execute:

```sql
CALL GetEmployeeByDept(3);
```

---

## Interview Questions

### Q1: What are the advantages of stored procedures?

### Answer:

* Faster execution due to execution plan caching
* Reduced network traffic
* Centralized business logic
* Improved security through controlled access

---

### Q2: Difference between Procedure and Function?

### Answer:

| Procedure                   | Function                           |
| --------------------------- | ---------------------------------- |
| May or may not return value | Must return value                  |
| Called using CALL/EXEC      | Used within SQL statements         |
| Can modify database         | Usually returns computation result |
| Supports IN/OUT parameters  | Typically only input parameters    |

---

# 16-8 and 16-9: SQL Triggers

## What is a Trigger?

A trigger is a special stored procedure automatically executed when an event occurs.

Events:

* INSERT
* UPDATE
* DELETE

---

## Trigger Example

PostgreSQL:

```sql
CREATE OR REPLACE FUNCTION log_salary_change()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO salary_audit(
        employee_id,
        old_salary,
        new_salary,
        changed_at
    )
    VALUES (
        OLD.id,
        OLD.salary,
        NEW.salary,
        CURRENT_TIMESTAMP
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

Create Trigger:

```sql
CREATE TRIGGER salary_update_trigger
AFTER UPDATE ON employees
FOR EACH ROW
WHEN (OLD.salary <> NEW.salary)
EXECUTE FUNCTION log_salary_change();
```

---

## Interview Questions

### Q1: What is the difference between BEFORE and AFTER triggers?

### Answer:

| BEFORE Trigger              | AFTER Trigger                |
| --------------------------- | ---------------------------- |
| Executes before event       | Executes after event         |
| Can validate or modify data | Used for logging/auditing    |
| Can prevent operations      | Cannot stop completed action |

---

### Q2: What are disadvantages of triggers?

### Answer:

* Hidden business logic
* Difficult debugging
* Performance overhead
* Increased maintenance complexity

---

# 16-10: Indexing Explained

## What is an Index?

An index is a database object that improves query performance by allowing faster data retrieval.

Similar to an index in a book.

---

## Create Index

```sql
CREATE INDEX idx_employee_email
ON employees(email);
```

---

## Composite Index

```sql
CREATE INDEX idx_dept_salary
ON employees(department_id, salary);
```

---

## Unique Index

```sql
CREATE UNIQUE INDEX idx_email
ON employees(email);
```

---

## Interview Questions

### Q1: Why do indexes improve performance?

### Answer:

Indexes reduce full table scans by using efficient data structures (typically B-Trees) to locate records quickly.

Without index:

```
Time Complexity ≈ O(n)
```

With index:

```
Time Complexity ≈ O(log n)
```

---

### Q2: Do indexes always improve performance?

### Answer:

No.

Advantages:

* Faster SELECT queries
* Faster JOIN operations
* Improved sorting

Disadvantages:

* Slower INSERT operations
* Slower UPDATE operations
* Slower DELETE operations
* Additional storage requirements

---

### Q3: What is a clustered index?

### Answer:

A clustered index determines the physical order of data storage.

Characteristics:

* Only one clustered index per table.
* Primary keys often use clustered indexes.

---

### Q4: What is a non-clustered index?

### Answer:

A separate structure containing indexed columns and pointers to actual data rows.

Characteristics:

* Multiple non-clustered indexes allowed.
* Does not alter physical data order.

---

# Most Frequently Asked SQL Interview Questions

## 1. Difference between DELETE, TRUNCATE, and DROP?

| DELETE                | TRUNCATE         | DROP                    |
| --------------------- | ---------------- | ----------------------- |
| Removes selected rows | Removes all rows | Removes entire object   |
| Can use WHERE         | No WHERE         | Deletes structure       |
| Can rollback          | Depends on DBMS  | Usually cannot rollback |
| Slower                | Faster           | Fastest                 |

---

## 2. What is normalization?

Normalization is the process of organizing data to reduce redundancy and improve integrity.

Normal Forms:

* 1NF
* 2NF
* 3NF
* BCNF

---

## 3. What are ACID properties?

### Atomicity

All operations succeed or fail together.

### Consistency

Database remains valid before and after transactions.

### Isolation

Concurrent transactions do not interfere.

### Durability

Committed changes persist permanently.

---

## 4. What is a transaction?

A sequence of operations treated as a single unit of work.

```sql
BEGIN;

UPDATE accounts
SET balance = balance - 500
WHERE id = 1;

UPDATE accounts
SET balance = balance + 500
WHERE id = 2;

COMMIT;
```

Rollback:

```sql
ROLLBACK;
```

---

## 5. Explain SQL execution order.

Actual execution order:

```text
FROM
JOIN
WHERE
GROUP BY
HAVING
SELECT
DISTINCT
ORDER BY
LIMIT
```

This is one of the most commonly asked SQL interview questions.

---

# Final Interview Preparation Tips

## Focus Areas

✓ Joins

✓ Group By and Having

✓ Subqueries

✓ Aggregate Functions

✓ Stored Procedures

✓ Triggers

✓ Indexing

✓ Transactions and ACID

✓ Normalization

✓ SQL Execution Order

---

## Practice Strategy

1. Solve SQL problems daily.
2. Explain your query logic aloud.
3. Compare multiple solutions.
4. Optimize queries using indexes.
5. Understand why a query works, not just how.

---

# Quick Revision Checklist

* [ ] Can explain correlated subqueries.
* [ ] Know Procedure vs Function differences.
* [ ] Understand Trigger lifecycle.
* [ ] Know clustered vs non-clustered indexes.
* [ ] Can explain ACID properties.
* [ ] Know SQL execution order.
* [ ] Can solve second highest salary problem.
* [ ] Understand aggregate functions and NULL handling.

Mastering these concepts will prepare you for most intermediate to advanced SQL interviews.
