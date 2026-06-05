# Database Fundamentals and Relational Data Modeling

## Complete Interview Preparation Notes

---

# Module 11 Roadmap

1. Database and Data vs Information
2. Why File Systems Fail
3. Types of Database Models
4. Anatomy of a Table (Relation)
5. Super Key
6. Candidate Key, Subset & Proper Subset
7. Primary, Alternate, Simple & Composite Keys
8. Foreign Key
9. Database Design Process
10. Relationship Cardinality & ER Diagram

---

# 11-1 Database and Data vs Information

---

## What is Data?

Data refers to raw facts, figures, observations, or values that have not yet been processed.

### Example

Suppose we have the following marks:

```text
85, 90, 88, 92, 87
```

These numbers alone do not tell us anything meaningful.

Therefore, they are called **Data**.

---

## What is Information?

Information is processed and organized data that provides meaning.

### Example

Data:

```text
85, 90, 88, 92, 87
```

Process:

```text
Average = (85+90+88+92+87)/5
Average = 88.4
```

Information:

```text
The average score of students is 88.4
```

Now the data provides useful insight.

---

## Data vs Information

| Data              | Information    |
| ----------------- | -------------- |
| Raw facts         | Processed data |
| No meaning        | Meaningful     |
| Input             | Output         |
| Unorganized       | Organized      |
| Example: 85,90,88 | Average = 88.4 |

---

## What is a Database?

A database is a structured collection of related data that is stored and organized for easy access, management, and retrieval.

### Example

Student Database

| ID | Name  | Email                                   |
| -- | ----- | --------------------------------------- |
| 1  | Rahim | [rahim@mail.com](mailto:rahim@mail.com) |
| 2  | Karim | [karim@mail.com](mailto:karim@mail.com) |

---

## Real-Life Examples of Databases

### Facebook

Stores:

* Users
* Posts
* Comments
* Messages

### E-Commerce

Stores:

* Products
* Orders
* Customers
* Payments

### University System

Stores:

* Students
* Courses
* Teachers
* Results

---

# Interview Questions

### What is Data?

Raw facts and figures without context.

---

### What is Information?

Processed data that provides meaning.

---

### Difference Between Data and Information?

Data is raw input while information is processed output.

---

### What is a Database?

A structured collection of related data organized for efficient storage and retrieval.

---

# 11-2 Why File Systems Fail

Before DBMS, organizations stored data using files.

Examples:

```text
students.txt
orders.xlsx
employees.csv
```

As systems grow, file systems create many problems.

---

## Problem 1: Data Redundancy

Same data stored multiple times.

### Example

Customer Name stored in:

```text
orders.csv
payments.csv
customers.csv
```

Result:

* Wasted storage
* Difficult maintenance

---

## Problem 2: Data Inconsistency

Same data has different values.

### Example

customers.csv

```text
Rahim
Dhaka
```

orders.csv

```text
Rahim
Khulna
```

Which one is correct?

This creates inconsistency.

---

## Problem 3: No Concurrency Control

Two employees edit same file simultaneously.

Result:

```text
Lost Updates
```

---

## Problem 4: Poor Security

Anyone who accesses the file can read or modify it.

---

## Problem 5: Difficult Data Retrieval

Finding specific information becomes slow and difficult.

---

## How DBMS Solves These Problems

| File System Problem | DBMS Solution  |
| ------------------- | -------------- |
| Redundancy          | Normalization  |
| Inconsistency       | Constraints    |
| Security            | Access Control |
| Concurrency         | Transactions   |
| Retrieval Issues    | SQL Queries    |

---

# Interview Question

Why is DBMS preferred over File Systems?

### Answer

DBMS reduces redundancy, improves consistency, provides security, supports concurrent access, and enables efficient querying.

---

# 11-3 Types of Database Models

A Database Model defines how data is organized.

---

## 1. Hierarchical Model

Tree Structure.

```text
Company
 └── Department
      └── Employee
```

### Advantages

* Simple structure

### Disadvantages

* Rigid
* Difficult to scale

---

## 2. Network Model

Records connected through multiple relationships.

```text
Student
 ↙     ↘
Course  Club
```

### Advantages

* Flexible

### Disadvantages

* Complex

---

## 3. Relational Model

Stores data in tables.

### Example

Users Table

| id | name  |
| -- | ----- |
| 1  | Rahim |

Orders Table

| id  | user_id |
| --- | ------- |
| 101 | 1       |

Most modern applications use this model.

---

## 4. Document Model

Stores data as JSON-like documents.

Example:

```json
{
  "name": "Rahim",
  "email": "rahim@mail.com"
}
```

MongoDB uses this model.

---

## 5. Key-Value Model

Stores data as key-value pairs.

```json
{
  "user_1": "Rahim"
}
```

Redis uses this model.

---

# Interview Question

Which database model is most popular today?

### Answer

Relational Database Model because it is easy to understand, supports SQL, and maintains strong data integrity.

---

# 11-4 The Anatomy of a Table (Relation)

A Relational Database stores data in Tables.

---

## Table / Relation

A collection of related records.

### Example

Users Table

| id | name  | email                                   |
| -- | ----- | --------------------------------------- |
| 1  | Rahim | [rahim@mail.com](mailto:rahim@mail.com) |

---

## Row / Tuple / Record

Represents one complete entry.

Example:

```text
1 Rahim rahim@mail.com
```

One row.

---

## Column / Attribute

Represents a property.

Examples:

```text
id
name
email
```

---

## Domain

Allowed values for a column.

Example:

```text
email column → only valid emails
age column → only positive integers
```

---

## Cardinality

Number of rows.

Example:

```text
10 users
```

Cardinality = 10

---

## Degree

Number of columns.

Example:

```text
id
name
email
age
```

Degree = 4

---

# Interview Questions

### What is a Tuple?

A row in a table.

### What is an Attribute?

A column in a table.

### Difference Between Cardinality and Degree?

Cardinality = Number of rows

Degree = Number of columns

---

# 11-5 to 11-8 Keys in Database

# Super Key

A set of attributes that uniquely identifies a record.

Example:

```text
{id}
{email}
{id,name}
{id,email}
```

All are Super Keys.

---

# Candidate Key

A minimal Super Key.

Example:

```text
{id}
{email}
```

These are Candidate Keys.

---

# Primary Key

One Candidate Key selected as the main identifier.

Example:

```text
id
```

Properties:

* Unique
* Not Null
* Stable

---

# Alternate Key

Candidate Keys not selected as Primary Key.

Example:

```text
email
```

---

# Composite Key

A key consisting of multiple columns.

Example:

```text
{name, gender}
```

---

# Simple Key

A key consisting of a single attribute.

Example:

```text
id
email
```

---

# Foreign Key

A field that references the Primary Key of another table.

Example:

Users

| id | name  |
| -- | ----- |
| 1  | Rahim |

Orders

| order_id | user_id |
| -------- | ------- |
| 101      | 1       |

Here:

```text
Orders.user_id
```

is the Foreign Key.

---

# Most Important Interview Question

Difference Between Primary Key and Foreign Key?

| Primary Key        | Foreign Key              |
| ------------------ | ------------------------ |
| Identifies records | References another table |
| Unique             | Can repeat               |
| Cannot be NULL     | Can be NULL              |
| One per table      | Multiple allowed         |

---

# 11-9 Database Design Process

Professional Database Design Steps

---

## Step 1: Understand Requirements

Example:

Course Platform

Need:

* Students
* Courses
* Instructors

---

## Step 2: Identify Entities

Entities:

```text
Student
Course
Instructor
```

---

## Step 3: Identify Attributes

Student

```text
student_id
name
email
```

Course

```text
course_id
course_name
```

Instructor

```text
instructor_id
name
```

---

## Step 4: Define Relationships

```text
Instructor teaches Courses
Students enroll in Courses
```

---

## Step 5: Resolve Many-to-Many

Students ↔ Courses

Create:

```text
Enrollments
```

Table

| student_id | course_id |
| ---------- | --------- |

---

## Step 6: Create ER Diagram

Visual representation of database structure.

---

# Interview Question

What is the first step of database design?

Requirement Analysis.

---

# 11-10 Relationship Cardinality and ER Diagrams

# Relationship Cardinality

Defines how many records of one entity relate to another.

---

## One-to-One (1:1)

Example:

```text
Person → Passport
```

One person has one passport.

---

## One-to-Many (1:N)

Example:

```text
Instructor → Courses
```

One instructor teaches many courses.

---

## Many-to-One (N:1)

Example:

```text
Many Students → One Department
```

---

## Many-to-Many (N:N)

Example:

```text
Students ↔ Courses
```

A student can take many courses.

A course can have many students.

---

# ER Diagram

ER = Entity Relationship Diagram

Shows:

* Entities
* Attributes
* Relationships

Example:

```text
Student
   |
Enrolls
   |
Course
```

---

# Top Interview Questions For This Module

1. What is Data?
2. What is Information?
3. Difference between Data and Information?
4. What is a Database?
5. Why is DBMS needed?
6. Why do File Systems fail?
7. What is a Relational Database?
8. What is a Tuple?
9. What is an Attribute?
10. What is Cardinality?
11. What is Degree?
12. What is a Super Key?
13. What is a Candidate Key?
14. What is a Primary Key?
15. What is an Alternate Key?
16. What is a Composite Key?
17. What is a Foreign Key?
18. Difference between Primary Key and Foreign Key?
19. What is Relationship Cardinality?
20. What is an ER Diagram?
21. How do you resolve a Many-to-Many relationship?
22. What are the steps of database design?

---

# Final Interview Focus

Spend most of your preparation time on:

* Data vs Information
* Database vs DBMS
* File System Problems
* Table, Row, Column, Domain
* Cardinality vs Degree
* Super Key
* Candidate Key
* Primary Key
* Foreign Key
* Composite Key
* Database Design Process
* Relationship Cardinality
* ER Diagram

These topics frequently appear in:

* Backend Developer Interviews
* Full Stack Developer Interviews
* SQL Interviews
* Software Engineering Interviews
* University Viva Exams
