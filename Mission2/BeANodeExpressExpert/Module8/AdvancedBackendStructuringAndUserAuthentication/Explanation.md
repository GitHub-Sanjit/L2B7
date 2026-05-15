# Module 7: ExpressJS Server Architecture & Database Integration

---

## 📌 Overview

This module covers building a backend server using:

- Express.js
- TypeScript
- PostgreSQL (Neon)
- node-postgres (pg)

You implemented a complete CRUD API with proper database integration.

---

# 🧱 Tech Stack

- **Backend Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **Database Client:** pg (node-postgres)

---

# 📁 Core Concepts Covered

1. Express Server Setup
2. Request & Response Handling
3. PostgreSQL Setup (Neon)
4. SQL Data Types
5. Database Connection (Pool)
6. CRUD Operations
7. Environment Configurations

---

# 🚀 Server Setup (Express + TypeScript)

```ts
import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();
```

### Middleware

```ts
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
```

### Why Middleware?

- Parses incoming request body
- Supports JSON, text, and form data

---

# 🔌 Database Connection (PostgreSQL)

```ts
import { Pool } from "pg";

const pool = new Pool({
  connectionString: config.connectionString,
});
```

### Why Pool?

- Handles multiple DB connections efficiently
- Improves performance

---

# 🗄️ Database Initialization

```ts
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(20) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log("Database Connected Successfully");
  } catch (error) {
    console.log({ error });
  }
};

initDB();
```

---

# 🧾 SQL Data Types Used

| Field      | Type      | Purpose           |
| ---------- | --------- | ----------------- |
| id         | SERIAL    | Auto increment ID |
| name       | VARCHAR   | User name         |
| email      | VARCHAR   | Unique email      |
| password   | VARCHAR   | Password          |
| is_active  | BOOLEAN   | Active status     |
| age        | INT       | User age          |
| created_at | TIMESTAMP | Creation time     |
| updated_at | TIMESTAMP | Update time       |

---

# 🔁 CRUD OPERATIONS

---

## 🟢 1. Create User (POST)

```ts
app.post("/api/users", async (req: Request, res: Response) => {
  const { name, email, password, age } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users(name, email, password, age)
       VALUES($1, $2, $3, $4)
       RETURNING *`,
      [name, email, password, age],
    );

    res.status(201).json({
      message: "User Created Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      data: error,
    });
  }
});
```

### Key Points:

- Parameterized query → prevents SQL Injection
- `RETURNING *` → returns inserted data

---

## 🔵 2. Get All Users (GET)

```ts
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
```

---

## 🔍 3. Get Single User (GET by ID)

```ts
app.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
```

---

## 🟡 4. Update User (PUT)

```ts
app.put("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, age, is_active } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users 
       SET name=COALESCE($1, name),
           password=COALESCE($2, password),
           age=COALESCE($3, age),
           is_active=COALESCE($4, is_active)
       WHERE id=$5
       RETURNING *`,
      [name, password, age, is_active, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
```

### COALESCE Explained:

- Keeps existing value if new value is `null`
- Enables partial updates

---

## 🔴 5. Delete User (DELETE)

```ts
app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM users WHERE id=$1 RETURNING *`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
```

---

# ⚙️ Environment Configuration

```ts
const port = config.port;
const connectionString = config.connectionString;
```

### Why Important?

- Keeps credentials secure
- Supports multiple environments (dev, prod)

---

# 🧩 Basic Route Example

```ts
app.get("/user", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hi there, How are you doing?",
    author: "Next Level",
  });
});
```

---

# ⚠️ Important Improvements

## ❌ 1. Password Security

- Currently stored as plain text ❌
- Should use hashing (bcrypt)

---

## ❌ 2. Error Handling

Avoid:

```ts
message: {
  Error: error;
}
```

Use:

```ts
message: error.message;
```

---

## ❌ 3. Validation Missing

- No input validation
- Should validate email, password, etc.

---

# 🏗️ Recommended Project Structure

```
src/
 ├── app.ts
 ├── config/
 ├── controllers/
 ├── services/
 ├── routes/
 └── db/
```

---

# 🧠 What You Learned

- Express server with TypeScript
- Middleware usage
- PostgreSQL integration
- SQL queries & data types
- CRUD operations
- Error handling basics
- Environment configuration

---

# 🚀 Next Steps (Very Important)

To move toward real-world backend:

- Add **MVC Architecture**
- Use **bcrypt** for password hashing
- Add **JWT Authentication**
- Use **Zod/Joi** for validation
- Add **global error handler**
- Add **pagination & filtering**

---

# ✅ Final Summary

You built a complete backend system with:

- REST API
- Database integration
- Full CRUD functionality

This is the **foundation of real backend development**.

---
