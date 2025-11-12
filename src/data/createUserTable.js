import dotenv from "dotenv";
import pool from "../config/db.js";

dotenv.config();

const createTableSQL = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

(async () => {
  try {
    await pool.query(createTableSQL);
    console.log("✅ 'users' table checked/created successfully.");
  } catch (err) {
    console.error("❌ Error creating 'users' table:", err.message);
  } finally {
    await pool.end();
  }
})();
