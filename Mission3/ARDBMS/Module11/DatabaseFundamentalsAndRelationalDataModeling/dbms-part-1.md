# DBMS Part-1 Interview Preparation Notes

# Database Management System (DBMS) – Interview Preparation Guide

---

# Table of Contents

1. What is Data?
2. What is Information?
3. What is a Database?
4. What is DBMS?
5. Problems with File Systems
6. Types of Databases
7. Database Models
8. Relational Database Concepts
9. Table, Row, Column, Domain
10. Cardinality and Degree
11. Keys in DBMS
12. Super Key
13. Candidate Key
14. Primary Key
15. Alternate Key
16. Composite Key
17. Simple Key
18. Foreign Key
19. Database Design Basics
20. Entities and Attributes
21. Relationship and Cardinality
22. Many-to-Many Relationship
23. ER Diagram
24. Most Common Interview Questions

---

# 1. What is Data?

## Definition

Data is a collection of raw facts, figures, values, observations, or measurements that have not yet been processed.

### Example

```
85, 90, 88, 92, 87
```

These numbers alone do not provide any meaningful understanding.

Therefore, they are considered **Data**.

---

# Interview Answer

**Data is raw and unprocessed facts that can be stored and later processed to generate meaningful information.**

---

# 2. What is Information?

## Definition

Information is processed and organized data that provides meaning and helps in decision making.

### Example

Data:

```
85, 90, 88, 92, 87
```

Processing:

```
Average = (85+90+88+92+87)/5
Average = 88.4
```

Information:

```
Average temperature is 88.4 degrees.
```

Now the data has meaning.

---

# Interview Question

## Difference Between Data and Information?

| Data        | Information    |
| ----------- | -------------- |
| Raw facts   | Processed data |
| No meaning  | Meaningful     |
| Input       | Output         |
| Unorganized | Organized      |

---

# 3. What is a Database?

## Definition

A database is a structured collection of related data that is organized for efficient storage, retrieval, and management.

### Example

Student Database

| ID | Name  | Email                                   |
| -- | ----- | --------------------------------------- |
| 1  | Rahim | [rahim@mail.com](mailto:rahim@mail.com) |
| 2  | Karim | [karim@mail.com](mailto:karim@mail.com) |

---

# Interview Answer

A database is an organized collection of related data that allows efficient storage, retrieval, updating, and management of information.

---

# 4. What is DBMS?

## Full Form

DBMS = Database Management System

## Definition

A software system that allows users to create, manage, manipulate, and retrieve data from databases.

### Examples

* MySQL
* PostgreSQL
* Oracle
* SQL Server
* SQLite
* MongoDB

---

# Responsibilities of DBMS

* Store data
* Retrieve data
* Update data
* Delete data
* Maintain security
* Handle concurrent users
* Maintain consistency

---

# Interview Question

## Why do we need DBMS?

Because managing data using simple files causes many problems.

---

# 5. Problems with File Systems

Before DBMS, data was stored in files such as:

```
.txt
.csv
.xlsx
```

This created several issues.

---

## 1. Data Redundancy

Same data stored multiple times.

### Example

Customer information appears in multiple files.

Result:

* Wasted storage
* Difficult maintenance

---

## 2. Data Inconsistency

Different versions of the same data.

### Example

File A:

```
City = Dhaka
```

File B:

```
City = Chittagong
```

Same customer but different values.

---

## 3. No Concurrency Control

Multiple users editing simultaneously can create conflicts.

---

## 4. Security Issues

No proper access control.

Anyone may access sensitive files.

---

# Interview Question

## What problems does DBMS solve?

DBMS solves:

* Data redundancy
* Data inconsistency
* Security issues
* Concurrency issues
* Data sharing problems

---

# 6. Types of Databases

## Relational Database

Stores data in tables.

Examples:

* MySQL
* PostgreSQL

---

## Document Database

Stores data as JSON-like documents.

Examples:

* MongoDB

---

## Key-Value Database

Stores data as key-value pairs.

Examples:

* Redis

---

# Interview Question

## Which database type is most common?

Relational Databases.

---

# 7. Database Models

A database model defines how data is organized.

---

## Hierarchical Model

Tree structure.

Parent-child relationship.

### Example

```
Company
 └── Department
      └── Employee
```

### Disadvantage

Rigid structure.

---

## Network Model

Records connected through multiple relationships.

### Advantage

Flexible.

### Disadvantage

Complex.

---

## Relational Model

Stores data in tables.

Most widely used today.

---

# Interview Question

## Why is the Relational Model popular?

Because it is:

* Simple
* Flexible
* Easy to query using SQL

---

# 8. Relational Database Concepts

A relational database stores data in tables called relations.

### Example

User Table

| id | name | email                                 |
| -- | ---- | ------------------------------------- |
| 1  | John | [john@mail.com](mailto:john@mail.com) |

---

# 9. Table, Row, Column, Domain

## Table (Relation)

Collection of related records.

---

## Row (Tuple / Record)

Represents one entity.

Example:

```
1 John john@mail.com
```

One row.

---

## Column (Attribute)

Represents a property.

Examples:

* id
* name
* email

---

## Domain (Constraint)

Allowed values for a column.

Examples:

```
email column → valid emails only
dob column → date values only
```

---

# Interview Question

## Difference Between Row and Column?

Row = single record

Column = attribute/property

---

# 10. Cardinality and Degree

## Cardinality

Number of rows in a table.

Example:

5 rows

Cardinality = 5

---

## Degree

Number of columns.

Example:

```
id
name
email
age
```

Degree = 4

---

# Interview Question

## Difference Between Cardinality and Degree?

Cardinality = Rows

Degree = Columns

---

# 11. Keys in DBMS

## Definition

A key is an attribute or set of attributes used to uniquely identify a record.

---

# Why Keys Are Needed

* Unique identification
* Faster retrieval
* Establish relationships
* Maintain integrity

---

# 12. Super Key

A set of attributes that uniquely identifies rows.

---

## Example

```
{id}
{id,name}
{id,email}
{email}
```

All can identify users uniquely.

Therefore all are Super Keys.

---

# Important Point

Super Keys may contain extra unnecessary attributes.

---

# Interview Question

## What is a Super Key?

A set of one or more attributes that uniquely identifies each row in a table.

---

# 13. Candidate Key

A minimal Super Key.

No attribute can be removed.

---

## Example

Super Keys:

```
{id}
{email}
{id,name}
```

Candidate Keys:

```
{id}
{email}
```

Because removing attributes is impossible.

---

# Interview Question

## Difference Between Super Key and Candidate Key?

Super Key:
May contain extra attributes.

Candidate Key:
Minimal Super Key.

---

# 14. Primary Key

One Candidate Key selected to identify records.

---

## Rules

Must be:

* Unique
* Not Null
* Stable

---

## Example

```
User
---------
id
name
email
```

Primary Key:

```
id
```

---

# Interview Question

## Can a table have multiple Primary Keys?

No.

Only one Primary Key.

---

# 15. Alternate Key

Candidate Keys not selected as Primary Key.

---

## Example

Candidate Keys:

```
{id}
{email}
```

Primary Key:

```
{id}
```

Alternate Key:

```
{email}
```

---

# Interview Question

## What is an Alternate Key?

A Candidate Key that is not chosen as the Primary Key.

---

# 16. Composite Key

A key made from multiple columns.

---

## Example

```
{name, gender}
```

Together identify a record.

---

# Interview Question

## When do we use Composite Keys?

When a single column cannot uniquely identify rows.

---

# 17. Simple Key

A key consisting of only one attribute.

Examples:

```
id
email
```

---

# Interview Question

## Difference Between Simple Key and Composite Key?

Simple Key:
One column.

Composite Key:
Multiple columns.

---

# 18. Foreign Key

## Definition

A Foreign Key is an attribute in one table that references the Primary Key of another table.

---

## Example

Customer Table

| CustomerID | Name  |
| ---------- | ----- |
| 1          | Alice |

Order Table

| OrderID | CustomerID |
| ------- | ---------- |
| 101     | 1          |

CustomerID in Order table is a Foreign Key.

---

# Why Foreign Keys Are Important

* Connect tables
* Maintain referential integrity
* Prevent invalid references

---

# Interview Question

## Difference Between Primary Key and Foreign Key?

Primary Key:

* Identifies rows
* Unique

Foreign Key:

* References another table
* May contain duplicates

---

# 19. Database Design

Database design is the process of organizing data efficiently.

---

# Goals

* Reduce redundancy
* Improve consistency
* Improve performance
* Ensure integrity

---

# Database Design Process

1. Determine Entities
2. Determine Attributes
3. Define Relationships
4. Resolve Many-to-Many Relationships
5. Create ER Diagram

---

# 20. Entities and Attributes

## Entity

Real-world object.

Examples:

* Student
* Course
* Instructor

---

## Attribute

Properties of an entity.

Student:

```
student_id
name
email
```

Course:

```
course_id
course_name
```

---

# Interview Question

## Difference Between Entity and Attribute?

Entity = Object

Attribute = Property of object

---

# 21. Relationship and Cardinality

Relationships connect entities.

---

## Cardinality Types

### One-to-One (1:1)

One user → One profile

---

### One-to-Many (1:N)

One instructor → Many courses

---

### Many-to-One (N:1)

Many students → One department

---

### Many-to-Many (N:N)

Many students ↔ Many courses

---

# Interview Question

## Which relationship is hardest to implement?

Many-to-Many

Because it requires a junction table.

---

# 22. Resolving Many-to-Many Relationships

Example:

Students ↔ Courses

Create:

```
Enrollments
```

Table

| student_id | course_id |
| ---------- | --------- |

This breaks N:N into two 1:N relationships.

---

# Interview Question

## How do you implement Many-to-Many in SQL?

Using a Junction Table (Bridge Table).

---

# 23. ER Diagram

## Full Form

Entity Relationship Diagram

## Definition

A visual representation of:

* Entities
* Attributes
* Relationships

---

## Purpose

Before creating database tables.

Helps understand:

* Structure
* Relationships
* Constraints

---

# Interview Question

## What is ER Diagram?

An ER Diagram visually represents entities, attributes, and relationships in a database system.

---

# 24. Most Common DBMS Interview Questions

### Q1. What is DBMS?

A software used to create, manage, and manipulate databases.

---

### Q2. What is a Database?

A structured collection of related data.

---

### Q3. Difference Between Data and Information?

Data = Raw facts

Information = Processed data

---

### Q4. What is a Table?

Collection of rows and columns.

---

### Q5. What is a Tuple?

A row in a table.

---

### Q6. What is an Attribute?

A column in a table.

---

### Q7. What is Cardinality?

Number of rows.

---

### Q8. What is Degree?

Number of columns.

---

### Q9. What is a Primary Key?

Uniquely identifies rows.

---

### Q10. What is a Foreign Key?

References a Primary Key in another table.

---

### Q11. Difference Between Primary Key and Candidate Key?

Primary Key:
Chosen Candidate Key.

Candidate Key:
Potential Primary Key.

---

### Q12. What is a Composite Key?

Key consisting of multiple columns.

---

### Q13. What is a Super Key?

Any key that uniquely identifies records.

---

### Q14. What is an Alternate Key?

Candidate Key not selected as Primary Key.

---

### Q15. What is an ER Diagram?

A diagram showing entities, attributes, and relationships.

---

# Final Interview Preparation Advice

Focus heavily on:

1. Database vs DBMS
2. Data vs Information
3. File System Problems
4. Relational Database Concepts
5. Table, Row, Column
6. Cardinality vs Degree
7. All Types of Keys
8. Primary Key vs Foreign Key
9. Entity, Attribute, Relationship
10. ER Diagram
11. Relationship Cardinality
12. Many-to-Many Resolution

These topics frequently appear in:

* Backend Developer Interviews
* Full Stack Interviews
* SQL Interviews
* University Viva Exams
* Software Engineer Interviews
