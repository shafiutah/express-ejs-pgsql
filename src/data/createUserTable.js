import {pool, testConnection} from "../config/db.js";

async function createUserTable() {
  try {
    await testConnection();
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await pool.query(query);
    console.log("✅ Users table created successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating 'users' table:", err.message);
    process.exit(1);
  }
}

createUserTable();
