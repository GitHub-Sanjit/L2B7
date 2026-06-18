# Module 18: Prisma ORM Fundamentals

## Table of Contents

1. Introduction to Prisma
2. What is Prisma ORM?
3. Why Choose Prisma?
4. Prisma Ecosystem and Core Tools
5. How Prisma Works Under the Hood
6. Prisma Learning Roadmap
7. Setting Up Prisma
8. First Data Model and Migration
9. Writing Your First Query
10. Prisma Workflow Summary
11. Important Interview Questions and Answers

---

# 18-1 Introduction to Prisma

Prisma is a modern ORM (Object Relational Mapper) designed for Node.js and TypeScript applications.

It acts as a bridge between your application code and your database.

Instead of writing complex SQL queries manually, Prisma allows developers to interact with databases using JavaScript or TypeScript objects and methods.

### Traditional Database Access

```sql
SELECT * FROM users WHERE email = 'john@example.com';
```

### Prisma Approach

```ts
const user = await prisma.user.findUnique({
  where: {
    email: "john@example.com",
  },
});
```

Prisma converts this operation into SQL behind the scenes and communicates with the database.

---

# 18-2 What is Prisma ORM?

ORM stands for Object Relational Mapping.

An ORM maps database tables to programming language objects.

### Database Table

| id | name |
| -- | ---- |
| 1  | John |

### JavaScript Object

```js
{
  id: 1,
  name: "John"
}
```

Prisma automatically handles this conversion.

### Benefits

* Less SQL writing
* Better productivity
* Type safety
* Easier maintenance
* Better developer experience

---

# 18-3 Why Choose Prisma?

Prisma has become popular because of its excellent developer experience.

## 1. Type Safety

Prisma automatically generates TypeScript types.

Example:

```ts
const user = await prisma.user.findUnique();
```

The IDE already knows all fields available on the user.

This reduces runtime errors.

---

## 2. Auto Completion

Prisma Client provides intelligent suggestions inside VS Code.

Benefits:

* Faster coding
* Fewer mistakes
* Better productivity

---

## 3. Migration System

Prisma can manage database schema changes.

Example:

```bash
npx prisma migrate dev
```

Prisma creates migration files and updates the database automatically.

---

## 4. Database Agnostic

Prisma supports:

* PostgreSQL
* MySQL
* SQLite
* SQL Server
* MongoDB

Switching databases becomes easier.

---

## 5. Better Developer Experience

Prisma focuses heavily on:

* Readability
* Productivity
* Type Safety
* Documentation

---

# 18-4 Prisma Ecosystem and Core Tools

Prisma consists of several tools.

## Prisma Schema

The central configuration file.

```prisma
schema.prisma
```

Contains:

* Models
* Relations
* Datasource
* Generator

---

## Prisma Client

Auto-generated query builder.

Example:

```ts
await prisma.user.findMany();
```

---

## Prisma Migrate

Handles schema migrations.

```bash
npx prisma migrate dev
```

---

## Prisma Studio

Database GUI.

```bash
npx prisma studio
```

Allows:

* View data
* Edit records
* Delete records

without SQL.

---

# 18-5 How Prisma Works Under The Hood

This is one of the most important interview topics.

---

## Step 1: Define Model

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

Model = Blueprint of a database table.

---

## Step 2: Migration

```bash
npx prisma migrate dev
```

Prisma converts model definitions into SQL.

Example:

```sql
CREATE TABLE User (
 id SERIAL PRIMARY KEY,
 name TEXT,
 email TEXT UNIQUE
);
```

---

## Step 3: Database Creation

Migration updates the database structure.

Database tables are created.

---

## Step 4: Generate Prisma Client

```bash
npx prisma generate
```

Prisma reads the schema and generates a type-safe client.

---

## Step 5: Query Database

```ts
await prisma.user.create({
  data: {
    name: "John",
    email: "john@gmail.com",
  },
});
```

---

## Prisma Workflow Diagram

```text
schema.prisma
      ↓
 Prisma Migrate
      ↓
 Database
      ↓
 Prisma Generate
      ↓
 Prisma Client
      ↓
 Application Queries
```

---

# Important Concepts

## Datasource

Defines database connection.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Purpose:

* Database type
* Connection URL

---

## Generator

Defines generated tools.

```prisma
generator client {
  provider = "prisma-client-js"
}
```

Purpose:

Generate Prisma Client.

---

## Seeding

Used for inserting initial data.

Example:

```ts
await prisma.user.create({
  data: {
    name: "Admin",
    email: "admin@gmail.com",
  },
});
```

Common uses:

* Default admin
* Sample data
* Testing data

---

# 18-6 Prisma Learning Roadmap

Recommended order:

1. Understand Databases
2. Learn SQL Basics
3. Learn Prisma Schema
4. Learn Models
5. Learn CRUD Operations
6. Learn Relations
7. Learn Migrations
8. Learn Aggregation
9. Learn Transactions
10. Learn Optimization

---

# 18-7 Setting Up Prisma

Install Prisma:

```bash
npm install prisma --save-dev
```

Initialize Prisma:

```bash
npx prisma init
```

Generated files:

```text
prisma/
  schema.prisma

.env
```

---

# Configure Database

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

---

# 18-8 First Data Model and Migration

Create Model:

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

Run Migration:

```bash
npx prisma migrate dev --name init
```

Generate Client:

```bash
npx prisma generate
```

Database table is now ready.

---

# 18-9 Write Your First Query

Import Prisma Client:

```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
```

---

## Create User

```ts
await prisma.user.create({
  data: {
    name: "John",
    email: "john@gmail.com",
  },
});
```

---

## Get All Users

```ts
await prisma.user.findMany();
```

---

## Get One User

```ts
await prisma.user.findUnique({
  where: {
    id: 1,
  },
});
```

---

## Update User

```ts
await prisma.user.update({
  where: {
    id: 1,
  },
  data: {
    name: "Updated Name",
  },
});
```

---

## Delete User

```ts
await prisma.user.delete({
  where: {
    id: 1,
  },
});
```

---

# 18-10 Module Summary

Prisma is a modern ORM that simplifies database interaction.

Core flow:

```text
Model
 ↓
Migration
 ↓
Database
 ↓
Generate Client
 ↓
CRUD Operations
```

Important tools:

* Prisma Schema
* Prisma Client
* Prisma Migrate
* Prisma Studio

Important concepts:

* Model
* Datasource
* Generator
* Migration
* Seeding

---

# Interview Questions and Answers

## Q1: What is Prisma?

### Answer

Prisma is a modern ORM for Node.js and TypeScript that provides a type-safe way to interact with databases. It converts application queries into SQL and offers tools like Prisma Client, Prisma Migrate, and Prisma Studio.

---

## Q2: What does ORM mean?

### Answer

ORM stands for Object Relational Mapping.

It maps database tables to programming language objects so developers can work with data using code instead of writing raw SQL.

---

## Q3: What are the main components of Prisma?

### Answer

The main components are:

1. Prisma Schema
2. Prisma Client
3. Prisma Migrate
4. Prisma Studio

---

## Q4: What is Prisma Client?

### Answer

Prisma Client is an auto-generated query builder that provides type-safe database operations such as create, read, update, and delete.

---

## Q5: What is Prisma Migrate?

### Answer

Prisma Migrate is Prisma's migration system. It converts schema changes into SQL migration files and applies them to the database.

---

## Q6: What is the purpose of schema.prisma?

### Answer

The schema.prisma file is the central configuration file where we define:

* Models
* Relations
* Datasource
* Generator

---

## Q7: What is the difference between migrate and generate?

### Answer

### Prisma Migrate

Updates database structure.

```bash
npx prisma migrate dev
```

### Prisma Generate

Creates Prisma Client.

```bash
npx prisma generate
```

Migration affects the database.

Generate affects application code.

---

## Q8: What is Seeding?

### Answer

Seeding means inserting initial or sample data into the database.

Examples:

* Admin user
* Sample products
* Test records

---

## Q9: Why is Prisma considered Type Safe?

### Answer

Prisma automatically generates TypeScript types from the schema.

This allows developers to catch errors during development rather than at runtime.

---

## Q10: Explain Prisma Workflow.

### Answer

```text
Define Model
     ↓
Run Migration
     ↓
Update Database
     ↓
Generate Client
     ↓
Write Queries
     ↓
Interact With Database
```

This workflow ensures database schema and application code remain synchronized.
