import {pool} from "../config/db.js";

export const getAllUsers = async () => {
  const result = await pool.query("SELECT id, name, email, role, created_at FROM users ORDER BY id ASC");
  return result.rows;
};

export const getUserByEmail = async (email) => {
  const {rows} = await pool.query("SELECT * FROM users WHERE email = $1 LIMIT 1;", [email]);
  return rows[0];
};

export const getUserById = async (id) => {
  const {rows} = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
  return rows[0];
};

export const createUser = async (name, email, hashedPassword, role = "user") => {
  const result = await pool.query("INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *", [
    name,
    email,
    hashedPassword,
    role,
  ]);
  return result.rows[0];
};

export const updateUser = async (id, name, email, role) => {
  await pool.query("UPDATE users SET name=$1, email=$2, role=$3 WHERE id=$4", [name, email, role, id]);
};

export const deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id=$1", [id]);
};
