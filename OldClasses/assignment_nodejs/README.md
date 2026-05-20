Perfect! Here's the edited document using **pg** and **Pool** for NeonDB (PostgreSQL).

---

# Library Management API with Express, TypeScript & PostgreSQL (NeonDB)

## 📖 Assignment: Library Management API with Express, TypeScript & PostgreSQL

### 🎯 Objective
Develop a Library Management System using Express, TypeScript, and PostgreSQL (NeonDB with pg/Pool).

Your project must include:

- Proper schema validation
- Business logic enforcement (e.g., availability control on borrow)
- Use of aggregation / complex queries (GROUP BY, JOINs)
- At least one database function or stored procedure
- Use of database triggers or middleware
- Filtering features

### 🔧 Core Requirements
- Use Express and TypeScript
- Connect to PostgreSQL (NeonDB) using **pg** and **Pool**
- Follow the exact API endpoints and response structures described below

### Book Model Fields & Validation
- **title** (string) — Mandatory. The book's title.
- **author** (string) — Mandatory. The book's author.
- **genre** (string) — Mandatory. Must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY.
- **isbn** (string) — Mandatory and unique. The book's International Standard Book Number.
- **description** (string) — Optional. A brief summary or description of the book.
- **copies** (number) — Mandatory. Non-negative integer representing total copies available.
- **available** (boolean) — Defaults to true. Indicates if the book is currently available for borrowing.

### Borrow Model Fields & Validation
- **bookId** (UUID/Foreign Key) — Mandatory. References the borrowed book's ID.
- **quantity** (number) — Mandatory. Positive integer representing the number of copies borrowed.
- **dueDate** (date) — Mandatory. The date by which the book must be returned.

✅ Generic Error Response (pg-based)
```json
{
  "message": "Database operation failed",
  "success": false,
  "error": {
    "type": "DatabaseError",
    "code": "23514",
    "constraint": "books_copies_check",
    "details": [
      {
        "field": "copies",
        "message": "Copies must be a positive number",
        "value": -5
      }
    ]
  }
}
```

## ✨ Main Section (50 Marks)

### 1. Create Book
**POST** `/api/books`

**Request:**
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

### 2. Get All Books
**GET** `/api/books`

Supports filtering, and sorting.

**Example Query:**
`/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

**Query Parameters:**
- `filter`: Filter by genre
- `sort`: asc or desc
- `limit`: Number of results (default: 10)

**Response:**
```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
  ]
}
```

### 3. Get Book by ID
**GET** `/api/books/:bookId`

**Response:**
```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

### 4. Update Book
**PUT** `/api/books/:bookId`

**Request:**
```json
{
  "copies": 50
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 50,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-20T08:30:00.000Z"
  }
}
```

### 5. Delete Book
**DELETE** `/api/books/:bookId`

**Response:**
```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

### 6. Borrow a Book
**POST** `/api/borrow`

**Business Logic:**
- Verify the book has enough available copies (using a **Pool transaction**)
- Deduct the requested quantity from the book's copies
- If copies become 0, update available to false (implement this using a **database trigger** or **stored procedure**)
- Save the borrow record with all relevant details

**Request:**
```json
{
  "bookId": "550e8400-e29b-41d4-a716-446655440000",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655441111",
    "bookId": "550e8400-e29b-41d4-a716-446655440000",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "2025-06-18T07:12:15.123Z",
    "updatedAt": "2025-06-18T07:12:15.123Z"
  }
}
```

### 7. Borrowed Books Summary (Using Complex SQL Queries)
**GET** `/api/borrow`

**Purpose:**
Return a summary of borrowed books, including:
- Total borrowed quantity per book (totalQuantity)
- Book details: title and isbn

**Details:**
Use SQL aggregation queries (**GROUP BY** with **JOIN**) to:
- Group borrow records by book
- Sum total quantity borrowed per book
- Return book info and total borrowed quantity

**Response:**
```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

## 💡 Pro Tip: 
Strictly follow the exact API endpoints and response formats provided in this document — any deviation may result in mark deduction.

## ✨ Bonus Section (10 Marks)
- **Code Quality:** Clean, readable code with meaningful names.
- **API Structure:** Follow provided endpoints and response formats exactly.
- **Error Handling:** Handle invalid input, 404s, and validation errors clearly.
- **Video Explanation:** Short recorded video explaining key features and logic.
- **Documentation:** Well-written README.md with setup and API details.
- **Database Optimization:** Use proper indexes and efficient queries with **pg/pool**.

## 🗄️ Database Configuration Notes

For this assignment, you must use:
- **pg** package for PostgreSQL connection
- **Pool** from pg for connection pooling
- **NeonDB** as the PostgreSQL database provider

### Sample Connection Setup:
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for NeonDB
});
```

### Required Database Schema (SQL):
```sql
CREATE TABLE books (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  genre VARCHAR(50) NOT NULL CHECK (genre IN ('FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY')),
  isbn VARCHAR(20) UNIQUE NOT NULL,
  description TEXT,
  copies INTEGER NOT NULL DEFAULT 1 CHECK (copies >= 0),
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE borrows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  due_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger function to update book availability
CREATE OR REPLACE FUNCTION update_book_availability()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE books 
  SET available = (copies > 0),
      updated_at = CURRENT_TIMESTAMP
  WHERE id = NEW.book_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_borrow_insert
AFTER INSERT ON borrows
FOR EACH ROW
EXECUTE FUNCTION update_book_availability();
```

---

This document now correctly specifies **pg**, **Pool**, and **NeonDB** for database operations.