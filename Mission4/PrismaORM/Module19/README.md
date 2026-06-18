# Module 19: Core Concepts of Prisma ORM

## Table of Contents

1. What is Data Modeling?
2. Overview of Prisma Schema
3. Data Sources, Generators, and Schema Location
4. Defining Models in Prisma
5. Deep Dive into Models and Fields
6. Field Attributes, Enums, and Composite Keys
7. One-to-One Relations
8. One-to-Many Relations
9. Many-to-Many Relations
10. Self Relations
11. Referential Actions (OnDelete & OnUpdate)
12. Module Summary
13. Important Interview Questions and Answers

---

# 19-1 What is Data Modeling?

Data Modeling is the process of designing how data will be organized, stored, and related inside a database.

Before creating tables, developers first identify:

* Entities
* Attributes
* Relationships
* Constraints

---

## Example

Imagine an Online Ticket Booking System.

### Entities

* User
* Match
* Booking

### Relationships

* A User can create many Bookings.
* A Match can have many Bookings.
* A Booking belongs to one User and one Match.

This design process is called Data Modeling.

---

## Why Data Modeling is Important?

Good data modeling helps:

* Reduce data duplication
* Improve data consistency
* Maintain data integrity
* Improve query performance
* Simplify application development

---

# 19-2 Overview of Prisma Schema

The Prisma Schema is the heart of every Prisma project.

File:

```text
prisma/schema.prisma
```

Everything Prisma needs is defined here.

---

## Main Sections of Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int    @id @default(autoincrement())
  name  String
}
```

Schema contains:

* Generator
* Datasource
* Models
* Relations
* Enums

---

# 19-3 Data Sources, Generators, and Schema Location

---

## Datasource

Datasource tells Prisma:

* Which database to use
* How to connect to it

Example:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

### Common Providers

```text
postgresql
mysql
sqlite
sqlserver
mongodb
```

---

## Generator

Generator defines what Prisma should generate.

Example:

```prisma
generator client {
  provider = "prisma-client-js"
}
```

This generates Prisma Client.

---

## Schema Location

Default:

```text
prisma/
 └── schema.prisma
```

Prisma automatically looks here.

---

# 19-4 Defining Models in Prisma

A Model represents a database table.

---

## Example

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

Equivalent SQL:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);
```

---

## Model Naming Convention

Prisma uses:

```text
PascalCase
```

Example:

```prisma
model User {}
model Booking {}
model Ticket {}
```

---

# 19-5 Deep Dive into Prisma Models and Fields

---

## Field Structure

```prisma
fieldName DataType Attributes
```

Example:

```prisma
email String @unique
```

---

## Common Data Types

### String

```prisma
name String
```

---

### Int

```prisma
age Int
```

---

### Float

```prisma
price Float
```

---

### Boolean

```prisma
isActive Boolean
```

---

### DateTime

```prisma
createdAt DateTime
```

---

## Optional Fields

```prisma
phone String?
```

Question mark means NULL is allowed.

---

## Required Fields

```prisma
name String
```

NULL not allowed.

---

## Arrays

```prisma
skills String[]
```

Stores multiple values.

---

# 19-6 Field Attributes, Enums, and Composite Keys

---

# Field Attributes

Attributes provide additional behavior.

---

## @id

Primary Key

```prisma
id Int @id
```

---

## @default

Default Value

```prisma
createdAt DateTime @default(now())
```

---

## @unique

Unique Constraint

```prisma
email String @unique
```

No duplicate emails allowed.

---

## @updatedAt

Automatically updates timestamp.

```prisma
updatedAt DateTime @updatedAt
```

---

# Enums

Enums restrict values to predefined options.

---

## Example

```prisma
enum UserRole {
  ADMIN
  USER
  MODERATOR
}
```

Use inside model:

```prisma
model User {
  id   Int @id @default(autoincrement())
  role UserRole
}
```

---

## Benefits

* Prevent invalid values
* Improve type safety
* Better readability

---

# Composite Keys

A Composite Key combines multiple fields to create a unique identifier.

---

## Example

```prisma
model Enrollment {
  studentId Int
  courseId  Int

  @@id([studentId, courseId])
}
```

Meaning:

```text
studentId + courseId
```

must be unique together.

---

# 19-7 One-to-One Relations

One record connects to exactly one record.

---

## Example

User ↔ Profile

```text
User -------- Profile
 1               1
```

---

## Prisma Example

```prisma
model User {
  id      Int @id @default(autoincrement())
  profile Profile?
}

model Profile {
  id      Int @id @default(autoincrement())

  userId  Int @unique
  user    User @relation(fields: [userId], references: [id])
}
```

---

## Why @unique?

Because one profile can belong to only one user.

Without @unique, multiple profiles could point to the same user.

---

# 19-8 One-to-Many Relations

One record relates to many records.

---

## Example

User → Bookings

```text
User
 ↓
Many Bookings
```

---

## Prisma Example

```prisma
model User {
  id       Int @id @default(autoincrement())

  bookings Booking[]
}

model Booking {
  id      Int @id @default(autoincrement())

  userId  Int
  user    User @relation(fields: [userId], references: [id])
}
```

---

## Understanding

One User:

```text
User 1
```

Many Bookings:

```text
Booking 1
Booking 2
Booking 3
```

---

# Many-to-Many Relations

Many records connect to many records.

---

## Example

Students ↔ Courses

```text
Many Students
      ↕
Many Courses
```

---

## Implicit Many-to-Many

```prisma
model Student {
  id      Int @id @default(autoincrement())

  courses Course[]
}

model Course {
  id       Int @id @default(autoincrement())

  students Student[]
}
```

Prisma automatically creates a join table.

---

## Explicit Many-to-Many

```prisma
model Student {
  id          Int @id @default(autoincrement())
  enrollments Enrollment[]
}

model Course {
  id          Int @id @default(autoincrement())
  enrollments Enrollment[]
}

model Enrollment {
  studentId Int
  courseId  Int

  student Student @relation(fields: [studentId], references: [id])
  course  Course  @relation(fields: [courseId], references: [id])

  @@id([studentId, courseId])
}
```

Use explicit relations when additional fields are needed.

Example:

```text
enrollmentDate
grade
status
```

---

# Self Relations

A model relates to itself.

---

## Example

Employee ↔ Manager

```text
Employee
   ↑
Manager
```

Manager is also an Employee.

---

## Prisma Example

```prisma
model Employee {
  id        Int @id @default(autoincrement())

  managerId Int?

  manager   Employee? @relation("ManagerRelation", fields: [managerId], references: [id])

  employees Employee[] @relation("ManagerRelation")
}
```

---

## Use Cases

* Organization hierarchy
* Category tree
* Comments and replies

---

# 19-9 Referential Actions

Referential Actions define what happens when related records change.

---

## OnDelete

Determines what happens when parent record is deleted.

---

## Cascade

```prisma
user User @relation(
  fields: [userId],
  references: [id],
  onDelete: Cascade
)
```

Meaning:

Delete User →

Automatically delete related Bookings.

---

## Restrict

```prisma
onDelete: Restrict
```

Prevents deletion if related records exist.

---

## SetNull

```prisma
onDelete: SetNull
```

Foreign key becomes NULL.

Requires optional relation.

```prisma
userId Int?
```

---

# OnUpdate

Defines behavior when referenced key changes.

---

## Cascade Update

```prisma
onUpdate: Cascade
```

Updates related foreign keys automatically.

---

# Real Example

```prisma
model Booking {
  id Int @id @default(autoincrement())

  userId Int

  user User @relation(
    fields: [userId],
    references: [id],
    onDelete: Cascade,
    onUpdate: Cascade
  )
}
```

---

# Module Summary

Important concepts learned:

* Data Modeling
* Prisma Schema
* Datasource
* Generator
* Models
* Fields
* Attributes
* Enums
* Composite Keys
* One-to-One Relations
* One-to-Many Relations
* Many-to-Many Relations
* Self Relations
* Referential Actions

---

# Interview Questions and Answers

## Q1: What is Data Modeling?

### Answer

Data Modeling is the process of designing how data is structured, stored, and related inside a database before implementation.

---

## Q2: What are the main sections of Prisma Schema?

### Answer

1. Datasource
2. Generator
3. Models
4. Enums
5. Relations

---

## Q3: What is the purpose of Datasource?

### Answer

Datasource defines:

* Database type
* Database connection URL

Example:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

## Q4: What is the purpose of Generator?

### Answer

Generator tells Prisma what code to generate.

Most commonly:

```prisma
generator client {
  provider = "prisma-client-js"
}
```

Generates Prisma Client.

---

## Q5: Difference Between @id and @unique?

### Answer

### @id

* Primary Key
* Only one per model
* Cannot be NULL

### @unique

* Unique constraint
* Multiple allowed
* Prevents duplicate values

---

## Q6: What is an Enum?

### Answer

An Enum restricts a field to predefined values.

Example:

```prisma
enum Role {
  ADMIN
  USER
}
```

Benefits:

* Type Safety
* Data Integrity
* Cleaner Code

---

## Q7: What is a Composite Key?

### Answer

A Composite Key uses multiple columns together as a primary key.

Example:

```prisma
@@id([studentId, courseId])
```

Neither field alone is unique, but together they uniquely identify a row.

---

## Q8: Difference Between One-to-One and One-to-Many?

### Answer

### One-to-One

```text
User ↔ Profile
```

One user has one profile.

### One-to-Many

```text
User → Bookings
```

One user has many bookings.

---

## Q9: What is a Many-to-Many Relation?

### Answer

A many-to-many relation exists when multiple records from one table can relate to multiple records in another table.

Example:

```text
Students ↔ Courses
```

A student can enroll in many courses and a course can have many students.

---

## Q10: What is a Self Relation?

### Answer

A self relation occurs when a model references itself.

Example:

```text
Employee ↔ Manager
```

Both records belong to the same table.

---

## Q11: What is Cascade Delete?

### Answer

Cascade Delete automatically removes child records when the parent record is deleted.

Example:

Delete User →

Delete all related Bookings automatically.

---

## Q12: When should you use Explicit Many-to-Many instead of Implicit Many-to-Many?

### Answer

Use Explicit Many-to-Many when the join table needs additional fields.

Example:

```text
Enrollment
- enrollmentDate
- grade
- status
```

Implicit Many-to-Many cannot store these extra fields.
