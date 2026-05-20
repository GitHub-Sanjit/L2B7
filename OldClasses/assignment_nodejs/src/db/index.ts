import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connectionString,
});

export const initDB = async () => {
  try {
    await pool.query(`
  CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    copies INT NOT NULL CHECK (copies >= 0),
    available BOOLEAN GENERATED ALWAYS AS (copies > 0) STORED,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS profiles (
      
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
      `);

    console.log("Database Connected Successfully");
  } catch (error) {
    console.log({ error: error });
  }
};
