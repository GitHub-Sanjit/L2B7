# Enrollment Database - SQL Practice & Interview Guide

## Overview
This project demonstrates a complete relational database design for an online learning platform. It includes three main tables:

- **students** → stores student information
- **courses** → stores course details
- **enrollments** → links students and courses (many-to-many relationship)

It covers:
- Table creation with constraints
- Data insertion
- Joins (INNER, LEFT, RIGHT, FULL)
- Aggregation (SUM, AVG, COUNT)
- Filtering (WHERE, HAVING)
- Data modification (UPDATE, DELETE)
- Pagination (LIMIT, OFFSET)
- NULL handling (COALESCE)

---

## 1. Database Design Explanation

### Students Table
Stores basic student information.

Key features:
- `student_id` is PRIMARY KEY
- `email` is UNIQUE
- `phone` allows NULL values

### Courses Table
Stores course metadata.

Key features:
- Pricing stored as DECIMAL for precision
- Category allows grouping of similar courses

### Enrollments Table
Acts as a **junction table** (many-to-many relationship).

Key features:
- Foreign keys:
  - `student_id → students`
  - `course_id → courses`
- Stores:
  - progress tracking
  - payment tracking

---

## 2. Important SQL Concepts Used

### 2.1 COALESCE (Handling NULL values)
```sql
COALESCE(phone, 'Not Provided')
````

### Explanation:

* Replaces NULL with a default value
* Useful for clean UI output

---

### 2.2 ORDER BY + LIMIT

```sql
ORDER BY price DESC LIMIT 5;
```

### Explanation:

* Sorts data in descending order
* Limits output to top 5 records

---

### 2.3 Pagination (LIMIT + OFFSET)

```sql
LIMIT 3 OFFSET 3;
```

### Explanation:

* OFFSET skips rows
* LIMIT controls page size
* Used in APIs and UI pagination

---

### 2.4 UPDATE Statement

```sql
UPDATE courses
SET price = price * 1.10
WHERE category = 'Programming';
```

### Explanation:

* Increases price by 10%
* Only affects Programming courses
* Demonstrates bulk update logic

---

### 2.5 DELETE with Condition

```sql
DELETE FROM enrollments
WHERE progress_percentage IS NULL;
```

### Explanation:

* Removes incomplete progress records
* Helps maintain clean dataset

---

## 3. GROUP BY & Aggregation

### Total Paid per Category

```sql
SELECT c.category, SUM(e.paid_amount)
FROM enrollments e
JOIN courses c ON e.course_id = c.course_id
GROUP BY c.category;
```

### Explanation:

* Groups data by category
* Calculates total revenue per category

---

### HAVING Clause Example

```sql
HAVING AVG(price) > 60;
```

### Difference between WHERE and HAVING:

| Clause | Purpose                      |
| ------ | ---------------------------- |
| WHERE  | Filters rows before grouping |
| HAVING | Filters after aggregation    |

---

## 4. JOIN Concepts

### 4.1 INNER JOIN

Returns only matching records.

```sql
SELECT full_name, course_title, paid_amount
FROM enrollments e
INNER JOIN students s ON e.student_id = s.student_id
INNER JOIN courses c ON e.course_id = c.course_id;
```

### Use Case:

* When you need only valid enrollments

---

### 4.2 LEFT JOIN

Returns all students, even if not enrolled.

### Use Case:

* Show inactive users

---

### 4.3 RIGHT JOIN

Returns all courses, even without students.

### Use Case:

* Identify unpopular courses

---

### 4.4 FULL OUTER JOIN

Returns everything from both tables.

### Use Case:

* Complete data audit

---

## 5. Aggregation Examples

### Count students per course

```sql
COUNT(e.student_id)
```

### Explanation:

* Counts enrollments per course
* Helps identify popular courses

---

### Average progress per course

```sql
AVG(progress_percentage)
```

### Explanation:

* Measures student engagement
* NULL values are ignored automatically

---

## 6. Date Functions

### Extract Year

```sql
EXTRACT(YEAR FROM enrollment_date)
```

### Explanation:

* Groups data yearly
* Useful for analytics dashboards

---

## 7. Interview Questions & Answers

### Q1: What is a FOREIGN KEY?

**Answer:**
A foreign key is a constraint that links one table to another. It ensures referential integrity.

In this database:

* `enrollments.student_id → students.student_id`
* `enrollments.course_id → courses.course_id`

👉 It prevents invalid enrollments.

---

### Q2: Difference between INNER JOIN and LEFT JOIN?

**Answer:**

| JOIN Type  | Behavior                      |
| ---------- | ----------------------------- |
| INNER JOIN | Only matching rows            |
| LEFT JOIN  | All left table rows + matches |

👉 LEFT JOIN is used when you want to preserve all students even if they are not enrolled.

---

### Q3: Why do we use COALESCE?

**Answer:**
COALESCE replaces NULL values with a default value.

Example:

```sql
COALESCE(phone, 'Not Provided')
```

👉 Prevents blank or NULL outputs in reports.

---

### Q4: What happens if you insert invalid foreign key data?

**Answer:**
The database will throw an error because:

* The referenced record does not exist
* Referential integrity is violated

Example:

* Inserting `student_id = 999` in enrollments when student does not exist → ERROR

---

### Q5: Difference between WHERE and HAVING?

**Answer:**

| Clause | When Used       |
| ------ | --------------- |
| WHERE  | Before grouping |
| HAVING | After grouping  |

Example:

* WHERE filters rows
* HAVING filters aggregated results

---

### Q6: Why do we use GROUP BY?

**Answer:**
GROUP BY is used to aggregate data into categories.

Example:

* Total revenue per course category
* Number of students per course

---

### Q7: What is normalization in this schema?

**Answer:**
This schema follows normalization:

* Students and courses are separated
* Enrollments acts as a relationship table

👉 Reduces redundancy and improves scalability

---

### Q8: Why is enrollments table important?

**Answer:**
It enables many-to-many relationships:

* One student → many courses
* One course → many students

Without it, the system would not scale.

---

## 8. Key Takeaways

* Use **JOINs** for combining data
* Use **GROUP BY** for analytics
* Use **FOREIGN KEY** for integrity
* Use **COALESCE** for clean output
* Use **LIMIT/OFFSET** for pagination

---

## 9. Final Thoughts

This database design represents a real-world learning platform structure. Mastering these concepts is essential for:

* Backend development
* Data analysis
* Interview preparation
* System design basics

