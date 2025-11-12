import bcrypt from "bcryptjs";
import {pool} from "../config/db.js";

// Admin: Get all users
export async function getAllUsers() {
  const result = await pool.query("SELECT id,name,email,role FROM users ORDER BY id ASC");
  return result.rows;
}

// Admin: Create user
export async function createUser({name, email, password, role}) {
  const hashed = await bcrypt.hash(password, 10);
  await pool.query("INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4)", [name, email, hashed, role || "user"]);
}

// Admin: Delete user
export async function deleteUser(id) {
  await pool.query("DELETE FROM users WHERE id=$1", [id]);
}

// Any user: Update own profile
export async function updateProfile(id, {name, email, password}) {
  try {
    console.log("Updating profile for user ID:", id);
    console.log("Form data:", {name, email, password: password ? "***" : "empty"});

    const userResult = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    if (!userResult.rows.length) {
      console.log("User not found with ID:", id);
      return null;
    }

    // Check if email is already taken by another user
    const emailCheck = await pool.query("SELECT id FROM users WHERE email=$1 AND id!=$2", [email, id]);
    if (emailCheck.rows.length > 0) {
      console.log("Email already exists:", email);
      const err = new Error("Email already in use");
      err.code = "EMAIL_EXISTS";
      throw err;
    }

    const hashed = password ? await bcrypt.hash(password, 10) : userResult.rows[0].password;

    console.log("Running update query with:", {name, email, id});
    const result = await pool.query(
      "UPDATE users SET name=$1,email=$2,password=$3,updated_at=NOW() WHERE id=$4 RETURNING id,name,email,role",
      [name, email, hashed, id]
    );

    console.log("Update result rows:", result.rows.length);
    return result.rows[0];
  } catch (err) {
    console.error("Error updating profile:", err.message);
    console.error("Error details:", err);
    throw err;
  }
}
