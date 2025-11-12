import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const {Pool} = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// ✅ Test the connection
(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Database connection successful!");
    client.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();

export default pool;
