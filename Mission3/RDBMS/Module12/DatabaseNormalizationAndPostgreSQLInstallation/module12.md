# Module 12: Database Normalization and PostgreSQL

# Complete Interview Preparation Notes

---

# Table of Contents

1. Data Anomalies
2. Types of Anomalies in DBMS
3. What is Normalization?
4. Functional Dependency
5. First Normal Form (1NF)
6. Second Normal Form (2NF)
7. Third Normal Form (3NF)
8. Resolving Many-to-Many Relationships
9. Junction Tables
10. Updating ER Diagrams
11. What is PostgreSQL?
12. PostgreSQL Architecture
13. PostgreSQL Installation Concepts
14. psql CLI Basics
15. Important PostgreSQL Commands
16. Frequently Asked Interview Questions
17. Advanced Interview Questions

---

# 12-1 Data Anomalies and Types of Anomalies in DBMS

---

# What is a Data Anomaly?

A Data Anomaly is an inconsistency or problem that occurs when a database is poorly designed.

These issues usually happen because:

* Duplicate data exists
* Multiple facts are stored in the same table
* Normalization has not been applied

---

# Example

Suppose we have a Student Course Table:

| StudentID | StudentName | Course | Instructor |
| --------- | ----------- | ------ | ---------- |
| 1         | Rahim       | DBMS   | Karim      |
| 2         | Hasan       | DBMS   | Karim      |
| 3         | Sakib       | Web    | Jannat     |

Notice:

* Instructor names repeat
* Course names repeat

This redundancy creates anomalies.

---

# Types of Anomalies

There are 3 major anomalies.

---

# 1. Insert Anomaly

Occurs when we cannot insert data without inserting unrelated data.

### Example

Suppose a new course exists:

```text
AI Course
Instructor = Fahim
```

No student enrolled yet.

Because StudentID is required, we cannot insert the course.

This is called Insert Anomaly.

---

# Interview Answer

Insert Anomaly occurs when certain information cannot be stored unless some unrelated information is also provided.

---

# 2. Update Anomaly

Occurs when the same data must be updated in multiple rows.

### Example

Instructor Karim changes name to:

```text
Dr. Karim
```

We must update:

```text
Row 1
Row 2
```

If one row remains unchanged:

```text
Karim
Dr. Karim
```

Database becomes inconsistent.

---

# Interview Answer

Update Anomaly occurs when one fact is stored in multiple places and requires multiple updates.

---

# 3. Delete Anomaly

Occurs when deleting a row accidentally removes useful information.

### Example

If we delete:

```text
StudentID = 3
```

We also lose:

```text
Course = Web
Instructor = Jannat
```

Even though course information should remain.

---

# Interview Answer

Delete Anomaly occurs when deleting one record unintentionally removes important information.

---

# Interview Question

Why do anomalies occur?

### Answer

Because of poor database design and lack of normalization.

---

# 12-2 Normalization and Functional Dependency

---

# What is Normalization?

Normalization is the process of organizing data to:

* Reduce redundancy
* Eliminate anomalies
* Improve consistency
* Improve maintainability

---

# Goals of Normalization

1. Eliminate duplicate data
2. Reduce anomalies
3. Improve integrity
4. Improve scalability

---

# Real-Life Analogy

Bad Organization:

```text
Everything in one drawer
```

Normalized Organization:

```text
Documents drawer
Clothes drawer
Electronics drawer
```

Everything is properly organized.

---

# Functional Dependency (FD)

The most important concept in normalization.

---

# Definition

Attribute B is functionally dependent on A if A uniquely determines B.

Notation:

```text
A → B
```

Read as:

```text
A determines B
```

---

# Example

Student Table

| StudentID | Name  |
| --------- | ----- |
| 1         | Rahim |
| 2         | Hasan |

We know:

```text
StudentID → Name
```

Because StudentID uniquely determines Name.

---

# More Examples

```text
EmployeeID → EmployeeName
```

```text
ProductID → ProductName
```

```text
RollNumber → StudentName
```

---

# Interview Question

What is Functional Dependency?

### Answer

A relationship where one attribute uniquely determines another attribute.

---

# 12-3 First Normal Form (1NF)

---

# Definition

A table is in 1NF if:

1. Each column contains atomic values
2. No repeating groups exist
3. Each cell contains a single value

---

# Bad Table

| StudentID | Name  | Courses           |
| --------- | ----- | ----------------- |
| 1         | Rahim | DBMS, Web, Python |

Courses contain multiple values.

Not 1NF.

---

# Convert to 1NF

| StudentID | Name  | Course |
| --------- | ----- | ------ |
| 1         | Rahim | DBMS   |
| 1         | Rahim | Web    |
| 1         | Rahim | Python |

Now every cell contains exactly one value.

1NF achieved.

---

# Interview Question

What is the main rule of 1NF?

### Answer

Every attribute must contain atomic (indivisible) values.

---

# Common Interview Trap

Question:

Is storing comma-separated values in a column valid?

Answer:

No.

It violates 1NF.

---

# 12-4 Second Normal Form (2NF)

---

# Definition

A table is in 2NF if:

1. Already in 1NF
2. No Partial Dependency exists

---

# What is Partial Dependency?

Occurs when a non-key attribute depends on only part of a composite key.

---

# Example

Enrollment Table

| StudentID | CourseID | StudentName |
| --------- | -------- | ----------- |
| 1         | 101      | Rahim       |

Primary Key:

```text
(StudentID, CourseID)
```

But:

```text
StudentID → StudentName
```

StudentName depends on only part of the key.

Partial Dependency exists.

Not 2NF.

---

# Convert to 2NF

Student Table

| StudentID | StudentName |
| --------- | ----------- |
| 1         | Rahim       |

Enrollment Table

| StudentID | CourseID |
| --------- | -------- |

Now 2NF achieved.

---

# Interview Question

What does 2NF remove?

### Answer

Partial Dependencies.

---

# 12-5 Third Normal Form (3NF)

---

# Definition

A table is in 3NF if:

1. Already in 2NF
2. No Transitive Dependency exists

---

# What is Transitive Dependency?

Occurs when:

```text
A → B
B → C
```

Thus:

```text
A indirectly determines C
```

---

# Example

Employee Table

| EmployeeID | DepartmentID | DepartmentName |
| ---------- | ------------ | -------------- |
| 1          | 10           | HR             |

Dependencies:

```text
EmployeeID → DepartmentID
DepartmentID → DepartmentName
```

Therefore:

```text
EmployeeID → DepartmentName
```

Indirect dependency exists.

Not 3NF.

---

# Convert to 3NF

Employee Table

| EmployeeID | DepartmentID |
| ---------- | ------------ |

Department Table

| DepartmentID | DepartmentName |
| ------------ | -------------- |

Now 3NF achieved.

---

# Interview Question

What does 3NF remove?

### Answer

Transitive Dependencies.

---

# Quick Comparison

| Normal Form | Removes               |
| ----------- | --------------------- |
| 1NF         | Repeating groups      |
| 2NF         | Partial dependency    |
| 3NF         | Transitive dependency |

---

# Interview Gold Question

Explain 1NF, 2NF and 3NF in one sentence.

### Answer

* 1NF removes repeating groups.
* 2NF removes partial dependencies.
* 3NF removes transitive dependencies.

---

# 12-6 Resolving Many-to-Many Relationships

---

# Problem

Students can enroll in many courses.

Courses can contain many students.

Relationship:

```text
Students ↔ Courses
```

Many-to-Many.

---

# Why Is This a Problem?

Relational databases cannot directly implement many-to-many relationships.

---

# Solution

Create a Junction Table.

---

# 12-7 Junction Table

---

# Example

Students

| StudentID |
| --------- |
| 1         |

Courses

| CourseID |
| -------- |
| 101      |

Enrollments

| StudentID | CourseID |
| --------- | -------- |
| 1         | 101      |

---

# Benefits

* Eliminates redundancy
* Supports many-to-many relationships
* Easier querying

---

# Interview Question

How do you implement a Many-to-Many relationship?

### Answer

By creating a Junction Table containing the primary keys of both tables.

---

# Updating ER Diagram

Before:

```text
Student ---- Course
N:N
```

After:

```text
Student
    |
Enrollment
    |
Course
```

Now:

```text
Student 1:N Enrollment
Course 1:N Enrollment
```

---

# 12-8 What is PostgreSQL?

---

# Definition

PostgreSQL is an open-source relational database management system (RDBMS).

Officially called:

```text
Postgres
```

---

# Features

* Open Source
* ACID Compliant
* SQL Support
* High Performance
* Extensible
* Reliable

---

# Popular Companies Using PostgreSQL

* Instagram
* Reddit
* Spotify
* Twitch

---

# Interview Question

Why is PostgreSQL popular?

### Answer

Because it is open-source, highly reliable, standards-compliant, scalable, and feature-rich.

---

# PostgreSQL vs MySQL

| PostgreSQL                  | MySQL                    |
| --------------------------- | ------------------------ |
| Advanced Features           | Simpler                  |
| Better Standards Compliance | Easier Learning Curve    |
| More Extensible             | More Common in Beginners |

---

# 12-9 Install PostgreSQL & Explore psql CLI

---

# What is psql?

PostgreSQL's command-line client.

Used for:

* Creating databases
* Running SQL
* Managing users
* Executing scripts

---

# Start psql

```bash
psql -U postgres
```

---

# Connect to Database

```bash
\c mydb
```

---

# List Databases

```bash
\l
```

---

# List Tables

```bash
\dt
```

---

# Describe Table

```bash
\d users
```

---

# Exit psql

```bash
\q
```

---

# Interview Question

What is psql?

### Answer

psql is PostgreSQL's interactive command-line tool used to execute SQL commands and administer databases.

---

# 12-10 Important PostgreSQL Commands

---

# Create Database

```sql
CREATE DATABASE company;
```

---

# Delete Database

```sql
DROP DATABASE company;
```

---

# Create Table

```sql
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);
```

---

# Show Tables

```sql
\dt
```

---

# Show Current Database

```sql
SELECT current_database();
```

---

# Show PostgreSQL Version

```sql
SELECT version();
```

---

# Show Current User

```sql
SELECT current_user;
```

---

# Add psql to PATH

Purpose:

Run:

```bash
psql
```

from anywhere in terminal.

Without PATH:

```bash
command not found
```

With PATH configured:

```bash
psql -U postgres
```

works globally.

---

# Most Important Interview Questions

### Database Normalization

1. What is normalization?
2. Why do we normalize databases?
3. What are anomalies?
4. Explain Insert Anomaly.
5. Explain Update Anomaly.
6. Explain Delete Anomaly.
7. What is Functional Dependency?
8. Difference between Partial and Transitive Dependency?
9. What is 1NF?
10. What is 2NF?
11. What is 3NF?
12. Explain normalization with an example.

---

### Database Design

13. Why are many-to-many relationships problematic?
14. What is a Junction Table?
15. How do you resolve N:N relationships?
16. What changes in the ER diagram after introducing a junction table?

---

### PostgreSQL

17. What is PostgreSQL?
18. Why choose PostgreSQL over MySQL?
19. What is psql?
20. How do you list databases in PostgreSQL?
21. How do you connect to a database?
22. How do you exit psql?
23. What is ACID compliance?

---

# Final Interview Focus

Spend most of your study time on:

1. Data Anomalies
2. Functional Dependency
3. 1NF
4. 2NF
5. 3NF
6. Partial Dependency
7. Transitive Dependency
8. Many-to-Many Relationships
9. Junction Tables
10. PostgreSQL Basics
11. psql Commands

These are among the most frequently asked DBMS and SQL interview topics for:

* Backend Developer Interviews
* Full Stack Developer Interviews
* Junior Software Engineer Interviews
* Database Developer Interviews
* University Viva Exams
---
---
---

# Module 12: Database Normalization & PostgreSQL

# Interview Questions and Answers

---

# Beginner Level Questions

## Q1. What is Database Normalization?

### Answer

Database Normalization is the process of organizing data in a database to reduce redundancy and eliminate data anomalies.

The main goals are:

* Reduce duplicate data
* Improve data consistency
* Prevent anomalies
* Improve maintainability

### Interview Tip

Whenever asked about normalization, always mention:

> "Reducing redundancy and eliminating anomalies."

---

## Q2. Why Do We Need Normalization?

### Answer

Without normalization, the same data may be stored multiple times, causing:

* Insert Anomaly
* Update Anomaly
* Delete Anomaly

Normalization helps organize data into multiple related tables to avoid these problems.

---

## Q3. What Are Data Anomalies?

### Answer

Data anomalies are problems that occur due to poor database design and data redundancy.

The three major anomalies are:

1. Insert Anomaly
2. Update Anomaly
3. Delete Anomaly

---

## Q4. What is Insert Anomaly?

### Answer

Insert Anomaly occurs when we cannot insert certain information into a database without inserting unrelated information.

### Example

Suppose a course exists but no student has enrolled yet.

If the table requires StudentID, the course cannot be inserted.

This is an Insert Anomaly.

---

## Q5. What is Update Anomaly?

### Answer

Update Anomaly occurs when the same information exists in multiple rows and must be updated in all of them.

### Example

If Instructor "Karim" appears in 50 rows and changes his name to "Dr. Karim", all 50 rows must be updated.

Missing even one row creates inconsistency.

---

## Q6. What is Delete Anomaly?

### Answer

Delete Anomaly occurs when deleting one record accidentally removes important information.

### Example

Deleting the last student enrolled in a course may also delete all information about that course.

---

# Functional Dependency

## Q7. What is Functional Dependency?

### Answer

A Functional Dependency exists when one attribute uniquely determines another attribute.

Notation:

```text
A → B
```

Meaning:

```text
A determines B
```

### Example

```text
StudentID → StudentName
```

StudentID uniquely identifies StudentName.

---

## Q8. Give Some Real-Life Examples of Functional Dependency.

### Answer

```text
EmployeeID → EmployeeName

ProductID → ProductName

RollNumber → StudentName

PassportNumber → CitizenName
```

---

## Q9. Why Is Functional Dependency Important?

### Answer

Functional Dependency is the foundation of normalization.

It helps identify:

* Partial Dependencies
* Transitive Dependencies
* Redundant Data

---

# First Normal Form (1NF)

## Q10. What is 1NF?

### Answer

A table is in First Normal Form if:

1. Every column contains atomic values.
2. No repeating groups exist.
3. Each cell contains only one value.

---

## Q11. What is an Atomic Value?

### Answer

An Atomic Value is a value that cannot be divided further.

### Good Example

```text
Course = DBMS
```

### Bad Example

```text
Course = DBMS, Python, Java
```

Multiple values violate 1NF.

---

## Q12. How Do You Convert a Table into 1NF?

### Answer

Break multi-valued attributes into separate rows.

### Before

| StudentID | Courses   |
| --------- | --------- |
| 1         | DBMS, Web |

### After

| StudentID | Course |
| --------- | ------ |
| 1         | DBMS   |
| 1         | Web    |

---

# Second Normal Form (2NF)

## Q13. What is 2NF?

### Answer

A table is in Second Normal Form if:

1. It is already in 1NF.
2. It has no Partial Dependency.

---

## Q14. What is Partial Dependency?

### Answer

Partial Dependency occurs when a non-key attribute depends on only part of a composite key.

---

## Q15. Explain Partial Dependency with Example.

### Answer

Table:

| StudentID | CourseID | StudentName |
| --------- | -------- | ----------- |

Primary Key:

```text
(StudentID, CourseID)
```

Dependency:

```text
StudentID → StudentName
```

StudentName depends only on StudentID, not the entire key.

Therefore Partial Dependency exists.

---

## Q16. What Does 2NF Remove?

### Answer

2NF removes Partial Dependencies.

---

# Third Normal Form (3NF)

## Q17. What is 3NF?

### Answer

A table is in Third Normal Form if:

1. It is already in 2NF.
2. It has no Transitive Dependency.

---

## Q18. What is Transitive Dependency?

### Answer

Transitive Dependency occurs when a non-key attribute depends on another non-key attribute.

### Example

```text
EmployeeID → DepartmentID
DepartmentID → DepartmentName
```

Therefore:

```text
EmployeeID → DepartmentName
```

Indirect dependency exists.

---

## Q19. What Does 3NF Remove?

### Answer

3NF removes Transitive Dependencies.

---

## Q20. Explain 1NF, 2NF and 3NF in One Sentence.

### Answer

* 1NF removes repeating groups.
* 2NF removes partial dependencies.
* 3NF removes transitive dependencies.

This is one of the most commonly asked interview questions.

---

# Many-to-Many Relationships

## Q21. What is a Many-to-Many Relationship?

### Answer

A Many-to-Many relationship exists when:

* One record from Table A can relate to many records in Table B.
* One record from Table B can relate to many records in Table A.

### Example

Students ↔ Courses

---

## Q22. Why Can't We Directly Implement Many-to-Many Relationships?

### Answer

Relational databases require relationships to be implemented through foreign keys.

Many-to-Many relationships need an intermediate table.

---

## Q23. How Do You Resolve a Many-to-Many Relationship?

### Answer

Create a Junction Table.

Example:

```text
Students
Courses
Enrollments
```

Enrollments contains:

```text
student_id
course_id
```

---

## Q24. What is a Junction Table?

### Answer

A Junction Table is an intermediate table used to implement a Many-to-Many relationship.

It contains foreign keys from both related tables.

---

# PostgreSQL

## Q25. What is PostgreSQL?

### Answer

PostgreSQL is an open-source Relational Database Management System (RDBMS) known for reliability, scalability, and standards compliance.

---

## Q26. Is PostgreSQL SQL or NoSQL?

### Answer

PostgreSQL is a Relational SQL Database.

---

## Q27. What Are the Advantages of PostgreSQL?

### Answer

* Open Source
* ACID Compliant
* Reliable
* Highly Scalable
* Strong SQL Support
* Advanced Features

---

## Q28. What Does ACID Mean?

### Answer

ACID stands for:

* Atomicity
* Consistency
* Isolation
* Durability

These properties guarantee reliable transactions.

---

## Q29. What is psql?

### Answer

psql is PostgreSQL's command-line interface used to manage databases and execute SQL commands.

---

## Q30. How Do You List Databases in PostgreSQL?

### Answer

```sql
\l
```

---

## Q31. How Do You Connect to a Database?

### Answer

```sql
\c database_name
```

---

## Q32. How Do You List Tables?

### Answer

```sql
\dt
```

---

## Q33. How Do You Exit psql?

### Answer

```sql
\q
```

---

# Advanced Interview Questions

## Q34. Why Is 3NF Better Than 2NF?

### Answer

2NF removes partial dependencies.

3NF removes both:

* Partial Dependencies
* Transitive Dependencies

Therefore 3NF reduces redundancy further.

---

## Q35. Is Higher Normalization Always Better?

### Answer

Not always.

Highly normalized databases may require many joins, which can impact performance.

Sometimes denormalization is intentionally used for faster reads.

---

## Q36. Which Normal Forms Should a Backend Developer Know Well?

### Answer

You should thoroughly understand:

* 1NF
* 2NF
* 3NF

These are asked in most interviews.

BCNF and higher forms are rarely asked in junior or mid-level interviews.

---

# 10 Questions You Must Memorize

1. What is Normalization?
2. What are Data Anomalies?
3. What is Functional Dependency?
4. What is 1NF?
5. What is 2NF?
6. What is 3NF?
7. What is Partial Dependency?
8. What is Transitive Dependency?
9. What is a Junction Table?
10. What is PostgreSQL?
