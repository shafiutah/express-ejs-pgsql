import pool from "../config/db.js";

export const createUser = async (name, email, passwordHash) => {
  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email;
  `;
  const {rows} = await pool.query(query, [name, email, passwordHash]);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const {rows} = await pool.query("SELECT * FROM users WHERE email = $1 LIMIT 1;", [email]);
  return rows[0];
};
